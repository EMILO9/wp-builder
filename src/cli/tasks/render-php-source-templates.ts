import type { ListrTask } from "listr2";
import Handlebars from "handlebars";
import path from "path";
import fs from "fs-extra";
import fg from "fast-glob";
import globParent from "glob-parent";
import type { TaskCTX } from "@shared/schemas/TaskCTX";

export function render_php_include_templates(): ListrTask<TaskCTX> {
  return {
    title: "Render PHP source templates",
    task: async (ctx, task) => {
      const { php } = ctx.config;
      const globPromises = php.includes.map((p) => fg(p, { onlyFiles: true }));
      const includeFiles = (await Promise.all(globPromises)).flat();
      const patternMappings = php.includes.map((pattern) => ({
        pattern,
        baseDir: globParent(pattern),
      }));
      if (!includeFiles.length) {
        task.skip("No matching PHP include files found");
        return;
      }
      for (const file of includeFiles) {
        const match = patternMappings.find((m) => file.startsWith(m.baseDir));
        const baseDir = match ? match.baseDir : path.dirname(file);
        const source = await fs.readFile(file, "utf-8");
        const rendered = Handlebars.compile(source, { noEscape: true })(
          ctx.context,
        );
        const targetFolder = path.basename(baseDir);
        const innerPath = path.relative(baseDir, file);
        const fileNameWithoutExt = path.parse(file).name;
        const outputPath = path.join(
          ctx.stagingPath,
          targetFolder,
          path.dirname(innerPath),
          `${fileNameWithoutExt}.php`,
        );
        await fs.outputFile(outputPath, rendered);
      }
    },
  };
}
