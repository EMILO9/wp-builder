import { z } from "zod";

export type PHPType = {
  /**
   * The main plugin entry point (e.g., the file with the WordPress Plugin Header).
   * @default "php/plugin.php"
   */
  entry: string;
  /**
   * List of glob patterns for PHP or Handlebars template files to be processed.
   * * Files matched here will be compiled, transformed, and output into
   * your staging directory.
   */
  includes: string[];
  /**
   * Custom Handlebars helpers for logic inside your templates.
   * * Use these to perform data formatting or conditional logic
   * during the build process.
   * @example { upper: (str) => str.toUpperCase() }
   */
  helpers: Record<string, (...args: any[]) => any>;
  /**
   * Glob patterns for global Handlebars partials.
   * * Partials defined here are registered globally and can be called
   * in any template using `{{> partialName }}`.
   */
  partials: string[];
};

export const PHPSchema: z.ZodType<PHPType, Partial<PHPType>> = z.object({
  entry: z.string().trim().nonempty().default("php/plugin.php"),
  includes: z.array(z.string().trim().nonempty()).default([]),
  helpers: z.record(z.string(), z.function()).default({}),
  partials: z.array(z.string().trim().nonempty()).default([]),
});
