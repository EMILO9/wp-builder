import type { ListrTask } from "listr2";
import fs from "fs-extra";
import type { TaskCTX } from "@shared/schemas/TaskCTX";

export function delete_plugin_directory(): ListrTask<TaskCTX> {
	return {
		title: "Delete plugin directory",
		task: (ctx) => fs.remove(ctx.buildRoot),
	};
}
