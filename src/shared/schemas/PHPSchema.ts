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
   * @example ["php/includes"]
   */
  sources: string[];
  /**
   * Custom Handlebars helpers.
   */
  helpers: Record<string, (...args: any[]) => any>;
  /*
   * Glob patterns for Handlebars partials.
   * Each string should be a glob pattern pointing to `.hbs` or `.php` files.
   */
  partials: string[];
};

export const PHPSchema: z.ZodType<PHPType, Partial<PHPType>> = z.object({
  entry: z.string().trim().nonempty().default("php/plugin.php"),
  sources: z.array(z.string().trim().nonempty()).default([]),
  helpers: z.record(z.string(), z.function()).default({}),
  partials: z.array(z.string().trim().nonempty()).default([]),
});
