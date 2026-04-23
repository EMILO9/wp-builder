import { z } from "zod";
import type { ConfigOutput } from "@shared/schemas/ConfigSchema";

export type DataType = (this: {
  header: ConfigOutput["header"];
}) => Record<string, any>;

export const DataSchema: z.ZodType<DataType, DataType> = z.function({
  input: [],
  output: z.record(z.string(), z.any()),
});
