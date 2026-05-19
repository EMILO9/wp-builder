import type { ListrTask } from "listr2";
import Handlebars from "handlebars";
import path from "path";
import fg from "fast-glob";
import fs from "fs-extra";
import type { TaskCTX } from "@shared/schemas/TaskCTX";

export function register_handlebar_partials(): ListrTask<TaskCTX> {
  return {
    title: "Register handlebar partials",
    task: async (ctx, task) => {
      const { php } = ctx.config;
      const globResults = php.partials.map((p) => fg(p, { onlyFiles: true }));
      const partialFiles = (await Promise.all(globResults)).flat();
      if (!partialFiles.length) {
        task.skip("No partial files found matching patterns");
        return;
      }
      for (const file of partialFiles) {
        const name = path.basename(file, path.extname(file));
        const content = await fs.readFile(file, "utf-8");
        Handlebars.registerPartial(name, content);
      }
    },
  };
}
