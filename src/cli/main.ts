import { cosmiconfig } from "cosmiconfig";
import { TypeScriptLoader } from "cosmiconfig-typescript-loader";
import pkg from "@pkg";
import parsePackageJsonName from "parse-packagejson-name";
import { Command } from "commander";
import { ConfigSchema } from "@shared/schemas/ConfigSchema";
import { build as ViteBuild } from "vite";
import hbs from "handlebars";
import fs from "fs-extra";
import path from "node:path";
import * as changeCase from "change-case";
import { consola } from "consola";
import ora from "ora";
import { fromError, isZodErrorLike } from "zod-validation-error";
import fg from "fast-glob";
import globParent from "glob-parent";
import AdmZip from "adm-zip";

const moduleName = parsePackageJsonName(pkg.name).fullName;
const explorer = cosmiconfig(moduleName, {
  loaders: {
    ".ts": TypeScriptLoader(),
  },
});

const program = new Command();

program.name(moduleName).description(pkg.description).version(pkg.version);

program
  .command("build")
  .description("Build the project")
  .action(async () => {
    const spinner = ora();
    try {
      // --- 1. CONFIGURATION LOADING ---
      spinner.start("Searching for configuration...");
      const result = await explorer.search();
      spinner.text = "Parsing configuration...";
      const { php, header, build, data } = ConfigSchema.parse(result?.config);
      const slug = changeCase.kebabCase(header.pluginName);
      const buildRoot = path.join(process.cwd(), ".plugin");
      const stagingPath = path.join(buildRoot, slug);
      // --- 2. CLEANUP ---
      spinner.text = "Cleaning build directory...";
      await fs.remove(buildRoot);
      // --- HANDLEBAR HELPERS/PARTIALS ---
      Object.entries(php.helpers).forEach(([name, fn]) => {
        hbs.registerHelper(name, fn);
      });
      if (php.partials.length) {
        spinner.text = "Registering Handlebars partials...";
        for (const pattern of php.partials) {
          const partialFiles = await fg(pattern, { onlyFiles: true });
          for (const file of partialFiles) {
            const name = path.basename(file, path.extname(file));
            const content = await fs.readFile(file, "utf-8");
            hbs.registerPartial(name, content);
          }
        }
      }
      // --- 3. PHP TEMPLATING (Main Entry) ---
      spinner.text = "Rendering PHP entry file...";
      const entryPath = path.join(process.cwd(), php.entry);
      const rawPHPSource = await fs.readFile(entryPath, "utf-8");
      const template = hbs.compile(rawPHPSource, { noEscape: true });
      const context = data?.call({ header }) ?? {};
      const renderedPHP = template(context);
      const outputPath = path.join(stagingPath, `${slug}.php`);
      await fs.outputFile(outputPath, renderedPHP);
      // --- 4. PHP TEMPLATING (Includes) ---
      if (php.sources.length) {
        spinner.text = "Processing PHP sources...";
        for (const pattern of php.sources) {
          const parentDir = globParent(pattern);
          const targetFolderName = path.basename(parentDir);
          const targetPath = path.join(stagingPath, targetFolderName);
          await fs.ensureDir(targetPath);
          const files = await fg(pattern, { onlyFiles: true });
          for (const file of files) {
            const source = await fs.readFile(file, "utf-8");
            const rendered = hbs.compile(source, { noEscape: true })(context);
            const subPath = path.relative(parentDir, file);
            const destination = path.join(targetPath, subPath);
            await fs.outputFile(destination, rendered);
          }
        }
      }
      // --- 5. ASSET BUNDLING (Vite) ---
      if (build) {
        spinner.text = "Running Vite build...";
        await ViteBuild({
          logLevel: "silent",
          resolve: {
            alias: build.alias,
          },
          define: {
            __DATA__: JSON.stringify(context),
          },
          plugins: build.plugins,
          build: {
            target: build.target,
            outDir: stagingPath,
            emptyOutDir: false,
            minify: build.minify,
            sourcemap: build.sourcemap,
            lib: {
              entry: path.resolve(process.cwd(), build.entry),
              name: changeCase.pascalCase(header.pluginName),
              formats: ["iife"],
              fileName: (format) => `${slug}.js`,
            },
            rolldownOptions: {
              external: Object.keys(build.external),
              output: {
                assetFileNames: (assetInfo) => {
                  const name = assetInfo.names?.[0] ?? "";

                  if (name.endsWith(".css")) {
                    return `${slug}.css`;
                  }

                  return `assets/[name][extname]`;
                },
                globals: build.external,
              },
            },
          },
        });
        // --- 6. PACKAGING (Zip) ---
        if (build.zip) {
          spinner.text = "Zipping plugin...";
          const zip = new AdmZip();
          const zipFileName = `${slug}.zip`;
          const zipOutputPath = path.join(buildRoot, zipFileName);
          zip.addLocalFolder(stagingPath, slug);
          zip.writeZip(zipOutputPath);
        }
      }
      spinner.succeed(`Build finished successfully in .plugin/${slug}`);
    } catch (error) {
      spinner.fail("Build failed");
      if (isZodErrorLike(error)) {
        consola.error(fromError(error).toString());
      } else if (error instanceof Error) {
        consola.error(error.message);
      } else {
        consola.error(String(error));
      }
      process.exit(1);
    }
  });

program.parse();
