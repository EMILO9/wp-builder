import { z } from "zod";

export type BuildType = {
  /**
   * Defines the JavaScript/TypeScript entry points for your plugin.
   * * Each key represents a named bundle (e.g., "frontend", "admin"),
   * which maps to the script handle used in `wp_enqueue_script`.
   * The value is the relative path to the source entry file.
   *
   * @default { main: "src/index.ts" }
   * @example
   * entry: { admin: "src/admin.ts", frontend: "src/public.ts" }
   */
  entry: Record<string, string>;
  /**
   * Configure module resolution aliases.
   * * Useful to keep import statements clean and avoid "import hell"
   * like `../../../../components`.
   * * @default {}
   * @example { "@components": "./src/components" }
   */
  alias: Record<string, string>;
  /**
   * Map of external dependencies to their global variable names.
   * * **WordPress Context:** Use this to prevent bundling core libraries
   * (like `react` or `jquery`) to keep your plugin bundle size small
   * and leverage browser-cached WordPress core assets.
   * * @default {}
   * @example { "react": "React", "react-dom": "ReactDOM" }
   */
  external: Record<string, string>;
  /**
   * Minification strategy for production builds.
   * * - `oxc`: Modern, Rust-based, industry-leading speed. Recommended.
   * - `esbuild`: Extremely fast, standard for Vite.
   * - `terser`: Traditional choice for maximum code crunching; best for extreme compatibility needs.
   * - `true`: Uses `oxc` by default.
   * - `false`: Disables minification; essential for readable production debugging.
   * * @default true
   */
  minify: boolean | "oxc" | "terser" | "esbuild";
  /**
   * Source map generation strategy.
   * * Use `true` or `inline` to map back to your original source
   * code in the browser's developer console when errors occur.
   * * @default false
   */
  sourcemap: boolean | "inline" | "hidden";
  /**
   * Browser compatibility target.
   * * Controls how modern your output JavaScript remains.
   * * - `baseline-widely-available`: The "Golden Mean." Targets browsers with >95% global support.
   * - `esnext`: Minimal transpilation; results in the smallest bundle size.
   * * @see https://caniuse.com/ (Check browser support for these features)
   * @default "baseline-widely-available"
   */
  target:
    | "es2016"
    | "es2017"
    | "es2018"
    | "es2019"
    | "es2020"
    | "es2021"
    | "es2022"
    | "esnext"
    | "baseline-widely-available";
  /**
   * Array of Vite or Rollup-compatible plugins to extend build behavior.
   * * Use this to add support for features like SVG handling, image optimization,
   * or custom pre-processing.
   * * @default []
   * @see https://vitejs.dev/guide/using-plugins.html
   */
  plugins: any[];
  /**
   * Enable ZIP packaging for distribution.
   * * If true, the build process will automatically bundle the compiled
   * output into a WordPress-compatible ZIP file in the `.plugin` folder.
   * * @default false
   */
  zip: boolean;
  /**
   * Files or glob patterns to include in the plugin package.
   * - Patterns are evaluated from the project root.
   * - Matches are copied into the plugin staging folder preserving their path
   *   relative to the repo root (e.g. `readme.txt` -> `.plugin/<slug>/readme.txt`).
   * - The build's staging folder is ignored so your build output won't be recopied.
   * - If you match files outside the project root they will be copied by filename
   *   into the plugin root (this may overwrite other files with the same name).
   * Examples: ["readme.txt", "LICENSE", "assets/screenshots/**"]
   * @default []
   */
  copy: string[];
};

export const BuildSchema: z.ZodType<BuildType, Partial<BuildType>> = z.object({
  entry: z
    .record(z.string(), z.string().trim().nonempty())
    .default({ main: "src/index.ts" }),
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
  zip: z.boolean().default(false),
  copy: z.array(z.string().nonempty()).default([]),
});
