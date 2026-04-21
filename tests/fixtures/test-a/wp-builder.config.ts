import { defineConfig } from "wp-builder";

export default defineConfig({
  header: { pluginName: "My Plugin!" },
  data() {
    return {
      name: this.header.pluginName,
    };
  },
  build: {},
});
