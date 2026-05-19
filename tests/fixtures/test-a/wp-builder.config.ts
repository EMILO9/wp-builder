import { defineConfig } from "wp-builder";

export default defineConfig({
  header: {
    pluginName: "My Awesome Plugin!",
    author: ["EMILO9"],
    authorURI: "https://example.com",
    description: "This plugin is awesome",
    domainPath: "/languages",
    license: "GPLv2 or later",
    licenseURI: "https://www.gnu.org/licenses/old-licenses/gpl-2.0.html",
    network: undefined,
    pluginURI: "https://example.com",
    requiresAtLeast: "6.0",
    requiresPHP: "7.4",
    requiresPlugins: [],
    textDomain: "my-awesome-plugin",
    updateURI: "https://example.com",
    version: "1.0.0",
  },
  php: {
    entry: "src/plugin.hbs",
    partials: ["src/partials/**/*.{php,hbs}"],
    includes: ["src/includes/**/*.{php,hbs}"],
    helpers: {},
  },
  build: {
    entry: { admin: "src/admin/main.ts" },
    alias: { "@": "./src/admin" },
    external: { jquery: "jQuery" },
    minify: "oxc",
    plugins: [],
    sourcemap: true,
    target: "baseline-widely-available",
    zip: true,
  },
  data() {
    return {
      ...this.header,
    };
  },
});
