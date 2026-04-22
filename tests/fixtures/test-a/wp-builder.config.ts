import { defineConfig } from "wp-builder";
import react from "@vitejs/plugin-react";

export default defineConfig({
  php: { entry: "php/plugin.php", includes: "php/includes" },
  header: { pluginName: "My Plugin!" },
  data() {
    return {
      name: this.header.pluginName,
    };
  },
  build: {
    external: { jquery: "jQuery" },
    minify: "oxc",
    target: "baseline-widely-available",
    plugins: [react()],
  },
});
