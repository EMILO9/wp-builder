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
   * Defines additional PHP filesystem sources to be included in the build.
   *
   * Each source can either point to a directory or to a file-matching rule.
   *
   * - Directory entries are created as-is in the final plugin output.
   * - File-matching entries are used to locate PHP files that will be processed,
   *   transformed using templates, and written into the build output.
   *
   * This allows you to mix static plugin structure with dynamic file processing
   * during the build step.
   *
   * @example
   * ["php/includes", "languages"]
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
