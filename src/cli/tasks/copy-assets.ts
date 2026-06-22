import type { ListrTask } from "listr2";
import path from "path";
import fg from "fast-glob";
import fs from "fs-extra";
import type { TaskCTX } from "@shared/schemas/TaskCTX";

export function copy_assets(): ListrTask<TaskCTX> {
  return {
    title: "Copy assets",
    task: async (ctx, task) => {
      const { build } = ctx.config;
      const patterns: string[] = build?.copy ?? [];
      if (!patterns.length) {
        task.skip("No copy patterns configured");
        return;
      }
      const stagingPath =
        ctx.stagingPath ?? ctx.buildRoot ?? path.join(process.cwd(), ".plugin");
      const stagingRel = path
        .relative(process.cwd(), stagingPath)
        .replace(/\\/g, "/");
      const stagingIgnore = stagingRel
        ? `${stagingRel}/**`
        : `${path.basename(stagingPath)}/**`;
      const globPromises = patterns.map((p) =>
        fg(p, {
          onlyFiles: true,
          dot: true,
          absolute: true,
          cwd: process.cwd(),
          ignore: [stagingIgnore],
        }),
      );
      const files = Array.from(
        new Set((await Promise.all(globPromises)).flat()),
      );
      if (!files.length) {
        task.skip("No files matched the configured patterns");
        return;
      }
      for (const abs of files) {
        const rel = path.relative(process.cwd(), abs);
        const safeRel = rel.startsWith("..") ? path.basename(abs) : rel;
        const dest = path.join(stagingPath, safeRel); // <- use local stagingPath
        await fs.ensureDir(path.dirname(dest));
        await fs.copy(abs, dest, { overwrite: true });
      }
    },
  };
}
