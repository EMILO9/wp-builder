import { z } from "zod";

export const HeaderSchema = z.object({
  pluginName: z.string().trim().nonempty(),
  pluginURI: z.url().optional(),
  description: z.string().trim().nonempty().max(140).optional(),
  version: z.string().trim().nonempty().default("1.0.0"),
  requiresAtLeast: z.string().trim().nonempty().optional(),
  requiresPHP: z.string().trim().nonempty().optional(),
  author: z.array(z.string().trim().nonempty()).default([]),
  authorURI: z.url().optional(),
  license: z.string().trim().nonempty().optional(),
  licenseURI: z.url().optional(),
  textDomain: z.string().trim().nonempty().optional(),
  domainPath: z.string().trim().nonempty().optional(),
  network: z.literal(true).optional(),
  updateURI: z.url().optional(),
  requiresPlugins: z.array(z.string().trim().nonempty()).default([]),
});

export type HeaderInput = z.input<typeof HeaderSchema>;
export type HeaderOutput = z.output<typeof HeaderSchema>;
