import type { ListrTask } from "listr2";
import path from "path";
import { build as ViteBuild } from "vite";
import { pascalCase } from "change-case";
import type { TaskCTX } from "@shared/schemas/TaskCTX";

export function bundle_assets_with_vite(): ListrTask<TaskCTX> {
  return {
    title: "Bundle assets with Vite",
    task: async (ctx, task) => {
      const { build, header } = ctx.config;
      if (!build) {
        task.skip("No build config");
        return;
      }
      if (!Object.entries(build.entry).length) {
        task.skip("No entries specified for bundling");
        return;
      }
      return task.newListr(
        Object.entries(build.entry).map(([name, entry]) => ({
          title: `Build ${name}`,
          task: () =>
            ViteBuild({
              logLevel: "silent",
              resolve: {
                alias: build.alias,
              },
              define: {
                __DATA__: JSON.stringify(ctx.context),
                "process.env.NODE_ENV": JSON.stringify("production"),
              },
              plugins: build.plugins,
              build: {
                target: build.target,
                outDir: path.join(ctx.stagingPath, name),
                emptyOutDir: false,
                minify: build.minify,
                sourcemap: build.sourcemap,
                lib: {
                  entry: path.resolve(process.cwd(), entry),
                  name: pascalCase(`${header.pluginName}-${name}`),
                  formats: ["iife"],
                  fileName: () => `${ctx.slug}-${name}.js`,
                },
                rolldownOptions: {
                  external: Object.keys(build.external),
                  output: {
                    assetFileNames: (assetInfo) => {
                      const file = assetInfo.names?.[0] ?? "asset";
                      const isCss = file.endsWith(".css");
                      return isCss
                        ? `${ctx.slug}-${name}.css`
                        : `assets/[name][extname]`;
                    },
                    globals: build.external,
                  },
                },
              },
            }),
        })),
        { concurrent: true },
      );
    },
  };
}
