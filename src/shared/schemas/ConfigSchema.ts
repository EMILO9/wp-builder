import { z } from "zod";
import { HeaderSchema } from "@shared/schemas/HeaderSchema";
import { BuildSchema } from "@shared/schemas/BuildSchema";
import { PHPSchema } from "@shared/schemas/PHPSchema";
import { DataSchema } from "@shared/schemas/DataSchema";

export const ConfigSchema = z.object({
  php: PHPSchema.default(PHPSchema.parse({})),
  header: HeaderSchema,
  build: BuildSchema.optional(),
  data: DataSchema.optional(),
});

export type ConfigInput = z.input<typeof ConfigSchema>;
export type ConfigOutput = z.output<typeof ConfigSchema>;
