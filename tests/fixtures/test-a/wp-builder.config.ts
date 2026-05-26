import { defineConfig, helpers } from "wp-builder";

export default defineConfig({
  header: {
    pluginName: "My Awesome Plugin!",
    author: ["WP Builder"],
    authorURI: "https://github.com/EMILO9/wp-builder",
    description: "This plugin is awesome",
    domainPath: "/languages",
    license: "GPLv2 or later",
    licenseURI: "https://www.gnu.org/licenses/old-licenses/gpl-2.0.html",
    network: undefined,
    pluginURI: "https://github.com/EMILO9/wp-builder",
    requiresAtLeast: "6.0",
    requiresPHP: "7.4",
    requiresPlugins: [],
    get textDomain() {
      return helpers.kebabCase(this.pluginName);
    },
    updateURI: "https://example.com",
    version: "1.0.0",
  },
  php: {
    entry: "src/plugin.hbs",
    helpers: { ...helpers },
  },
  build: {
    entry: { admin: "src/admin/main.ts" },
    alias: { "@": "./src/admin" },
    external: { jquery: "jQuery" },
    minify: "oxc",
    plugins: [],
    sourcemap: false,
    target: "baseline-widely-available",
    zip: true,
  },
  data() {
    return {
      ...this.header,
      appID: helpers.kebabCase(`${this.header.pluginName}-app`),
    };
  },
});
