import type { ConfigInput } from "@shared/schemas/ConfigSchema";
import type { HeaderOutput } from "@shared/schemas/HeaderSchema";

export function defineConfig(
  config: Omit<ConfigInput, "data"> & {
    data?: (this: { header: HeaderOutput }) => Record<string, any>;
  },
) {
  return config;
}
