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
    try {
      const result = await explorer.search();
      const { entry, header, build, data } = ConfigSchema.parse(result?.config);
      const slug = changeCase.kebabCase(header.pluginName);
      const buildRoot = path.join(process.cwd(), ".plugin");
      const stagingPath = path.join(buildRoot, slug);
      await fs.remove(buildRoot);
      const entryPath = path.join(process.cwd(), entry);
      const rawPHPSource = await fs.readFile(entryPath, "utf-8");
      const template = hbs.compile(rawPHPSource, { noEscape: true });
      const context = data?.call({ header }) ?? {};
      const renderedPHP = template(context);
      const outputPath = path.join(stagingPath, `${slug}.php`);
      await fs.outputFile(outputPath, renderedPHP);
      if (build) {
        await ViteBuild({
          build: {
            outDir: stagingPath,
            emptyOutDir: false,
            lib: {
              entry: path.resolve(process.cwd(), build.entry),
              name: changeCase.pascalCase(header.pluginName),
              formats: ["iife"],
              fileName: (format) => `${slug}.js`,
            },
            rolldownOptions: {
              output: {
                assetFileNames: `${slug}.[ext]`,
              },
            },
          },
        });
      }
    } catch (error) {
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
