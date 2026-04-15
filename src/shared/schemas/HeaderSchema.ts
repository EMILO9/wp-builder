import { z } from "zod";

export const HeaderSchema = z.object({
	pluginName: z.string().trim().nonempty(),
});

export type HeaderInput = z.input<typeof HeaderSchema>;
export type HeaderOutput = z.output<typeof HeaderSchema>;
