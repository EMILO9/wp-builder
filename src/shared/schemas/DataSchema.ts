import { z } from "zod";
import type { ConfigOutput } from "@shared/schemas/ConfigSchema";

export type DataType = (this: {
  header: ConfigOutput["header"];
  paths: Record<string, { js: string; css: string }>;
}) => Record<string, unknown>;

export const DataSchema: z.ZodType<DataType, DataType> = z.function({
  input: [],
  output: z.record(z.string(), z.unknown()),
});
