import type { ConfigInput, ConfigOutput } from "@shared/schemas/ConfigSchema";

export function defineConfig(
  config: Omit<ConfigInput, "data"> & {
    data?: (this: Pick<ConfigOutput, "headers">) => Record<string, any>;
  },
) {
  return config;
}

defineConfig({
  headers: { pluginName: "My Plugin!" },
  data() {
    return {};
  },
});
