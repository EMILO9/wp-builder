import type { ConfigInput, ConfigOutput } from "@shared/schemas/ConfigSchema";

export function defineConfig(
  config: Omit<ConfigInput, "data"> & {
    data?: (this: Omit<ConfigOutput, "data">) => Record<string, any>;
  },
) {
  return config;
}
