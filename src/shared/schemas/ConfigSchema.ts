import { z } from "zod";
import { HeaderSchema } from "@shared/schemas/HeaderSchema";
import { BuildSchema } from "@shared/schemas/BuildSchema";

export const ConfigSchema = z.object({
	headers: HeaderSchema,
	build: BuildSchema.default(BuildSchema.parse({})),
});

export type ConfigInput = z.input<typeof ConfigSchema>;
export type ConfigOutput = z.output<typeof ConfigSchema>;
