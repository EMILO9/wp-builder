import { z } from "zod";

export const BuildSchema = z
  .object({ entry: z.string().trim().nonempty().default("src/index.ts") })
  .optional();

export type BuildInput = z.input<typeof BuildSchema>;
export type BuildOutput = z.output<typeof BuildSchema>;
