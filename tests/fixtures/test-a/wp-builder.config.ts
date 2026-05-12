import { defineConfig } from "wp-builder";
import react from "@vitejs/plugin-react";

export default defineConfig({
  php: {
    entry: "php/plugin.php",
    sources: ["php/includes/**/*.php", "languages"],
  },
  header: { pluginName: "My Plugin!" },
  data() {
    return {
      name: this.header.pluginName,
    };
  },
  build: {
    entry: { main: "src/index.ts", frontend: "frontend/main.ts" },
    external: { jquery: "jQuery" },
    minify: "oxc",
    target: "baseline-widely-available",
    plugins: [react()],
    zip: true,
  },
});
