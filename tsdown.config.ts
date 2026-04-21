import { defineConfig } from "tsdown";

export default defineConfig([
	{
		entry: { "cli-m": "src/cli/main.ts" },
		format: ["esm"],
		banner: { js: "#!/usr/bin/env node" },
		outDir: "dist/cli",
		dts: false,
	},
	{
		entry: { "lib-m": "src/lib/main.ts" },
		format: ["esm", "cjs"],
		outDir: "dist/lib",
		dts: true
	},
]);
