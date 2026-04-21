import { z } from "zod";
import { HeaderSchema } from "@shared/schemas/HeaderSchema";
import { BuildSchema } from "@shared/schemas/BuildSchema";

export const ConfigSchema = z.object({
  entry: z.string().trim().nonempty().default("plugin.php"),
  headers: HeaderSchema,
  build: BuildSchema,
  data: z
    .function({ input: [], output: z.record(z.string(), z.any()) })
    .optional(),
});

export type ConfigInput = z.input<typeof ConfigSchema>;
export type ConfigOutput = z.output<typeof ConfigSchema>;
