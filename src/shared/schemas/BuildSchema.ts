import { z } from "zod";

export const BuildSchema = z
	.object({
		entry: z.string().trim().nonempty().default("src/index.ts"),
		alias: z.record(z.string(), z.string()).default({}),
		external: z.record(z.string(), z.string()).default({}),
		minify: z
			.union([
				z.boolean(),
				z.literal("oxc"),
				z.literal("terser"),
				z.literal("esbuild"),
			])
			.default(true),
		sourcemap: z
			.union([z.boolean(), z.literal("inline"), z.literal("hidden")])
			.default(false),
		target: z
			.union([
				z.literal("es2016"),
				z.literal("es2017"),
				z.literal("es2018"),
				z.literal("es2019"),
				z.literal("es2020"),
				z.literal("es2021"),
				z.literal("es2022"),
				z.literal("esnext"),
				z.literal("baseline-widely-available"),
			])
			.default("baseline-widely-available"),
		plugins: z.array(z.any()).default([]),
	})
	.optional();

export type BuildInput = z.input<typeof BuildSchema>;
export type BuildOutput = z.output<typeof BuildSchema>;
