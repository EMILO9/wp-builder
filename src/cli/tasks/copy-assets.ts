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
      const { stagingPath } = ctx;
      const patterns = build?.copy ?? [];
      const copyOperations = await Promise.all(
        patterns.map(async (pattern) => {
          const files = await fg(pattern.from, { dot: true });
          return files.map((file, index) => {
            const baseName = path.basename(file, path.extname(file));
            const ext = path.extname(file);
            const fileName = pattern.rename
              ? pattern.rename(index, baseName, ext)
              : path.basename(file);
            return {
              src: file,
              dest: path.join(stagingPath, pattern.to, fileName),
            };
          });
        }),
      );
      const flatOps = copyOperations.flat();
      if (flatOps.length === 0) {
        task.skip("No assets matched the provided patterns.");
        return;
      }
      for (const op of flatOps) {
        await fs.ensureDir(path.dirname(op.dest));
        await fs.copy(op.src, op.dest);
      }
    },
  };
}
