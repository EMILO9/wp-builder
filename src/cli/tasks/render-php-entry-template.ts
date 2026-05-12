import type { ListrTask } from "listr2";
import Handlebars from "handlebars";
import path from "path";
import fs from "fs-extra";
import type { TaskCTX } from "@shared/schemas/TaskCTX";

export function render_php_entry_template(): ListrTask<TaskCTX> {
	return {
		title: "Render PHP entry template",
		task: async (ctx) => {
			const { php } = ctx.config;
			const entryPath = path.join(process.cwd(), php.entry);
			const rawPHPSource = await fs.readFile(entryPath, "utf-8");
			const template = Handlebars.compile(rawPHPSource, {
				noEscape: true,
			});
			const renderedPHP = template(ctx.context);
			const outputPath = path.join(ctx.stagingPath, `${ctx.slug}.php`);
			await fs.outputFile(outputPath, renderedPHP);
		},
	};
}
