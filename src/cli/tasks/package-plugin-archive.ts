import type { ListrTask } from "listr2";
import path from "path";
import AdmZip from "adm-zip";
import type { TaskCTX } from "@shared/schemas/TaskCTX";

export function package_plugin_archive(): ListrTask<TaskCTX> {
	return {
		title: "Package plugin archive",
		task: (ctx, task) => {
			const { build } = ctx.config;
			if (!build?.zip) {
				task.skip("Archive packaging disabled");
				return;
			}
			const zip = new AdmZip();
			const zipFileName = `${ctx.slug}.zip`;
			const zipOutputPath = path.join(ctx.buildRoot, zipFileName);
			zip.addLocalFolder(ctx.stagingPath, ctx.slug);
			zip.writeZip(zipOutputPath);
		},
	};
}
