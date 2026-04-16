import { z } from "zod";

export const BuildSchema = z.object({}).optional();

export type BuildInput = z.input<typeof BuildSchema>;
export type BuildOutput = z.output<typeof BuildSchema>;
