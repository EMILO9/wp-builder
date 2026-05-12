import { z } from "zod";
import type { ConfigOutput } from "@shared/schemas/ConfigSchema";

export type DataType = (this: {
	header: ConfigOutput["header"];
}) => Record<string, unknown>;

export const DataSchema: z.ZodType<DataType, DataType> = z.function({
	input: [],
	output: z.record(z.string(), z.unknown()),
});
