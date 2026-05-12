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
			ctx.context = config.data?.call({ header: config.header }) ?? {};
		},
	};
}
