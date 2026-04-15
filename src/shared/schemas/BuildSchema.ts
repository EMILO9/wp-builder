import { z } from "zod";

export const BuildSchema = z.tuple([
	z.boolean(),
	z.object({
		outDir: z.string().trim().nonempty().optional(),
	}),
]);

export type BuildInput = z.input<typeof BuildSchema>;
export type BuildOutput = z.output<typeof BuildSchema>;
