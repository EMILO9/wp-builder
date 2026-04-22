import type { ConfigInput } from "@shared/schemas/ConfigSchema";

export interface UserConfig extends ConfigInput {}
export function defineConfig(config: UserConfig) {
  return config;
}
