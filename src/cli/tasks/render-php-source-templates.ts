import type { ListrTask } from "listr2";
import Handlebars from "handlebars";
import path from "path";
import fs from "fs-extra";
import fg from "fast-glob";
import globParent from "glob-parent";
import type { TaskCTX } from "@shared/schemas/TaskCTX";

export function render_php_source_templates(): ListrTask<TaskCTX> {
	return {
		title: "Render PHP source templates",
		task: async (ctx) => {
			const { php } = ctx.config;
			for (const pattern of php.sources) {
				const isGlob = fg.isDynamicPattern(pattern);
				if (!isGlob) {
					const targetPath = path.join(ctx.stagingPath, pattern);
					await fs.ensureDir(targetPath);
					continue;
				}
				const parentDir = globParent(pattern);
				const targetPath = path.join(
					ctx.stagingPath,
					path.basename(parentDir),
				);
				await fs.ensureDir(targetPath);
				const files = await fg(pattern, { onlyFiles: true });
				for (const file of files) {
					const source = await fs.readFile(file, "utf-8");
					const rendered = Handlebars.compile(source, {
						noEscape: true,
					})(ctx.context);
					const subPath = path.relative(parentDir, file);
					await fs.outputFile(
						path.join(targetPath, subPath),
						rendered,
					);
				}
			}
		},
	};
}
