import { z } from "zod";

export type BuildType = {
  /**
   * The entry point for your plugin's JavaScript/TypeScript.
   * Vite will use this as the root for its dependency graph.
   * @default "src/index.ts"
   * @example "src/main.ts"
   */
  entry: string;
  /**
   * Defines aliases for custom import paths to simplify module resolution.
   * Useful for avoiding deep relative paths (e.g., `../../components`).
   * @default {}
   * @example { "@": "./src/components" }
   */
  alias: Record<string, string>;
  /**
   * External dependencies that should be excluded from the bundle.
   * For WordPress, you usually externalize 'jquery' or 'react' to use the
   * versions provided by the WordPress core.
   * @default {}
   * @example { "jquery": "jQuery", "react": "React" }
   */
  external: Record<string, string>;
  /**
   * The minification strategy to use for your JavaScript bundles.
   * - `oxc`: High-performance Rust-based minification (Fastest).
   * - `esbuild`: Vite's default fast minifier.
   * - `terser`: Traditional choice for maximum compression (Slowest).
   * - `true`: Uses the default minifier (oxc).
   * - `false`: Disables minification entirely for debugging.
   * @default true
   */
  minify: boolean | "oxc" | "terser" | "esbuild";
  /**
   * Whether to generate source maps for debugging.
   * - `true`: Generates a standard `.map` file.
   * - `false`: No source maps are generated.
   * - `inline`: Appends the source map as a DataURI at the end of the file.
   * - `hidden`: Generates the `.map` file but doesn't link it in the bundle.
   * @default false
   */
  sourcemap: boolean | "inline" | "hidden";
  /**
   * The JavaScript language version or browser compatibility target.
   * This determines which modern syntax features are transpiled.
   * * **Supported Targets & Key Features:**
   * - `es2016`: `Array.prototype.includes`, Exponentiation operator (`**`).
   * - `es2017`: `async/await`, `Object.values/entries`.
   * - `es2018`: Rest/Spread properties, `Promise.prototype.finally`.
   * - `es2019`: `Array.prototype.flat`, `Object.fromEntries`.
   * - `es2020`: Optional Chaining (`?.`), Nullish Coalescing (`??`), `BigInt`.
   * - `es2021`: `String.prototype.replaceAll`, Logical Assignment (`??=`).
   * - `es2022`: Class Fields, Top-level `await`, `Array.prototype.at`.
   * - `esnext`: Supports all proposed features currently in the pipeline.
   * - `baseline-widely-available`: Features supported by all major browsers (Chrome, Edge, Firefox, Safari) for at least 2 years.
   * * @default "baseline-widely-available"
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
   * Array of Vite plugins to extend the build process.
   * Supports official Vite plugins, community Rollup plugins, and local scripts.
   * @default []
   * @see https://vitejs.dev/guide/using-plugins.html
   */
  plugins: any[];
};

export const BuildSchema: z.ZodType<BuildType, Partial<BuildType>> = z.object({
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
});
