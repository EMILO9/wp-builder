import type { ConfigInput } from "@shared/schemas/ConfigSchema";

export interface UserConfig {
  /**
   * Configure how PHP files are discovered and loaded.
   *
   * Use this to define the main entry file and any additional files
   * that should be included or scanned during initialization.
   *
   * If omitted, sensible defaults are applied.
   */
  php?: ConfigInput["php"];
  /**
   * Core metadata for your plugin or theme.
   *
   * This is the only required section. At minimum, you must provide
   * the `pluginName`, but additional header fields can be supplied
   * depending on your setup.
   */
  header: ConfigInput["header"];
  /**
   * Build pipeline configuration.
   *
   * Controls how assets are processed, bundled, and output.
   * Leave undefined to use the default build behavior.
   */
  build?: ConfigInput["build"];
  /**
   * Define global data available at build time and in templates.
   *
   * This must be a function that returns an object. It is executed
   * during the build process and can access the resolved `header`
   * via `this`.
   *
   * The returned object is:
   * - Injected as global constants in the build
   * - Exposed as top-level variables in templates
   *
   * @example
   * data() {
   *   return {
   *     API_URL: "https://example.com",
   *     VERSION: this.header.version,
   *   };
   * }
   */
  data?: ConfigInput["data"];
}

export function defineConfig(config: UserConfig) {
  return config;
}

defineConfig({
  header: { pluginName: "12" },
  data() {
    return {};
  },
});
