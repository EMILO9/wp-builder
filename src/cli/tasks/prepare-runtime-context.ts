import type { ListrTask } from "listr2";
import path from "path";
import { kebabCase } from "change-case";
import type { TaskCTX } from "@shared/schemas/TaskCTX";

export function prepare_runtime_context(): ListrTask<TaskCTX> {
  return {
    task: (ctx) => {
      const { config } = ctx;
      ctx.slug = kebabCase(config.header.pluginName);
      ctx.buildRoot = path.join(process.cwd(), ".plugin");
      ctx.stagingPath = path.join(ctx.buildRoot, ctx.slug);
      const paths = config.build
        ? Object.entries(config.build.entry).reduce(
            (acc, [name]) => {
              acc[name] = {
                js: `${name}/${ctx.slug}-${name}.js`,
                css: `${name}/${ctx.slug}-${name}.css`,
              };
              return acc;
            },
            {} as Record<string, { js: string; css: string }>,
          )
        : {};
      ctx.context = config.data?.call({ header: config.header, paths }) ?? {};
    },
  };
}
