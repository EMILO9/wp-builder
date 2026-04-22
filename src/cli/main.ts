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
      if (php.includes) {
        spinner.text = "Processing PHP includes...";
        const includesPath = path.join(process.cwd(), php.includes);
        const files = await fs.readdir(includesPath, { withFileTypes: true });
        for (const file of files) {
          if (!file.isFile()) continue;
          const fullSrcPath = path.join(includesPath, file.name);
          const source = await fs.readFile(fullSrcPath, "utf-8");
          const rendered = hbs.compile(source, { noEscape: true })(context);
          const nameWithoutExt = path.parse(file.name).name;
          await fs.outputFile(
            path.join(stagingPath, "includes", `${nameWithoutExt}.php`),
            rendered,
          );
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
