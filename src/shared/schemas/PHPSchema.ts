import { z } from "zod";

export type PHPType = {
  /**
   * The primary PHP entry point for the plugin.
   * This is typically the file containing the Plugin Header and main initialization logic.
   * @default "php/plugin.php"
   * @example "index.php"
   */
  entry: string;
  /**
   * A directory or glob pattern for additional PHP files to be included.
   * Files in this path are typically auto-loaded or scanned for registration.
   * @example "php/includes"
   */
  includes?: string;
};

export const PHPSchema: z.ZodType<PHPType, Partial<PHPType>> = z.object({
  entry: z.string().trim().nonempty().default("php/plugin.php"),
  includes: z.string().trim().nonempty().optional(),
});
