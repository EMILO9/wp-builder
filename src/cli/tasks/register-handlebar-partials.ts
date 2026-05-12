import type { ListrTask } from "listr2";
import Handlebars from "handlebars";
import path from "path";
import fg from "fast-glob";
import fs from "fs-extra";
import type { TaskCTX } from "@shared/schemas/TaskCTX";

export function register_handlebar_partials(): ListrTask<TaskCTX> {
	return {
		title: "Register handlebar partials",
		task: async (ctx) => {
			const { config } = ctx;
			for (const pattern of config.php.partials) {
				const partialFiles = await fg(pattern, { onlyFiles: true });
				for (const file of partialFiles) {
					const name = path.basename(file, path.extname(file));
					const content = await fs.readFile(file, "utf-8");
					Handlebars.registerPartial(name, content);
				}
			}
		},
	};
}
