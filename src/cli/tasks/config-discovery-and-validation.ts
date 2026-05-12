import type { ListrTask } from "listr2";
import { cosmiconfig } from "cosmiconfig";
import { TypeScriptLoader } from "cosmiconfig-typescript-loader";
import { ConfigSchema } from "@shared/schemas/ConfigSchema";
import type { TaskCTX } from "@shared/schemas/TaskCTX";

export function discover_and_validate_config(
	moduleName: string,
): ListrTask<TaskCTX> {
	return {
		title: "Config Discovery & Validation",
		task: async (ctx) => {
			const explorer = cosmiconfig(moduleName, {
				loaders: {
					".ts": TypeScriptLoader(),
				},
			});
			const result = await explorer.search();
			if (!result) {
				throw new Error(
					"Configuration not found. Please create a config file.",
				);
			}
			if (result.isEmpty) {
				throw new Error(
					"Configuration file is empty. Please provide valid config.",
				);
			}
			ctx.config = ConfigSchema.parse(result.config);
		},
	};
}
