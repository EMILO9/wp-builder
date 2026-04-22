import { z } from "zod";
import type { ConfigOutput } from "@shared/schemas/ConfigSchema";

/**
 * A functional configuration for defining global constants and template data.
 * * - **Vite Injection:** The returned object is mapped to `define` in Vite,
 * making properties available globally as `__DATA__`.
 * - **HBS Context:** The returned keys are available directly in Handlebars templates.
 * * @this { header: ConfigOutput["header"] } - Access to the plugin/theme headers.
 */
export type DataType = (this: {
  header: ConfigOutput["header"];
}) => Record<string, any>;

export const DataSchema: z.ZodType<DataType, DataType> = z.function({
  input: [],
  output: z.record(z.string(), z.any()),
});
