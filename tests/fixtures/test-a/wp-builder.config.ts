import { defineConfig } from "wp-builder";

export default defineConfig({
	header: { pluginName: "My Plugin!" },
	data() {
		return {
			name: this.header.pluginName,
			arr: [1, 2, 3],
		};
	},
	build: {
		external: { jquery: "jQuery" },
		minify: "oxc",
		target: "baseline-widely-available",
	},
});
