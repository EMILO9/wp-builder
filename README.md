# 🏛️ wp-builder

**The Universal Build Orchestrator for Modern WordPress Development**

`wp-builder` is a high-performance CLI designed to bridge the gap between modern development workflows and classic WordPress architecture. It unifies PHP templating, Vite-powered asset bundling, and automated distribution into a single, type-safe pipeline.

---

## ✨ Key Features

- **⚡ Blazing Fast Bundling**: Leverages **Vite** and **Oxc** for near-instant compilation of TypeScript, React, and modern CSS.
- **🧩 Logic-Driven PHP**: Power your PHP files with **Handlebars**. Inject metadata, use custom functional helpers, and register partials directly from your config.
- **🛡️ Rock-Solid Type Safety**: Built on Zod, providing full IDE autocomplete and schema validation for every configuration option.
- **📦 Distribution Automator**: Instant staging folder generation and `.zip` packaging, ensuring your plugin is ready for the "Upload Plugin" button immediately.
- **🔌 WP-Native Intelligence**: Deep support for WordPress globals, externalizing core libraries (jQuery, React), and automated plugin header generation.

---

## 🚀 Quick Start

### 1. Installation

```bash
npm install @emilo/wp-builder --save-dev
```

## Full Configuration Example

```typescript
import { defineConfig } from "@emilo/wp-builder";
import react from "@vitejs/plugin-react";

defineConfig({
  /**
   * --- PROJECT METADATA ---
   * These values are passed into the Handlebars context via the data()
   * method below. You must manually place them in your PHP files
   * using tags like {{pluginName}} or {{version}}.
   */
  header: {
    // Used in PHP: Plugin Name: {{pluginName}}
    pluginName: "My Plugin!",
    // Used in PHP: Version: {{version}}
    version: "1.0.0",
    // Used in PHP: Author: {{author}}
    author: ["Anonymous"],
    // Used in PHP: Author URI: {{authorURI}}
    authorURI: "https://my-site.com",
    // Used in PHP: Description: {{description}}
    description: "My Awesome Plugin!",
    // Used in PHP: Domain Path: {{domainPath}}
    domainPath: "/languages",
    // Used in PHP: License: {{license}}
    license: "GPLv2 or later",
    // Used in PHP: License URI: {{licenseURI}}
    licenseURI: "https://www.gnu.org/licenses/gpl-3.0.html",
    // Used in PHP: Network: {{#if network}}true{{/if}}
    network: true,
    // Used in PHP: Plugin URI: {{pluginURI}}
    pluginURI: "https://my-site.com",
    // Used in PHP: Requires at least: {{requiresAtLeast}}
    requiresAtLeast: "6.9.0",
    // Used in PHP: Requires PHP: {{requiresPHP}}
    requiresPHP: "7.4",
    // Used in PHP: Requires Plugins: {{requiresPlugins}}
    requiresPlugins: ["woocommerce"],
    // Used in PHP: Text Domain: {{textDomain}}
    textDomain: "my-plugin",
    // Used in PHP: Update URI: {{updateURI}}
    updateURI: "https://my-site.com",
  },

  /**
   * --- PHP ORCHESTRATION ---
   * Defines which files get the Handlebars treatment and where they go.
   */
  php: {
    // The main file where you manually write your {{pluginName}} headers
    entry: "php/plugin.php",
    // Includes and translation files moved to the staging directory
    sources: ["php/includes/**/*.php", "languages/"],
    // Custom logic available for your templates (e.g., {{uppercase textDomain}})
    helpers: {
      uppercase: (v: string) => v.toUpperCase(),
    },
    // Reusable UI/logic snippets for your PHP files
    partials: ["src/partials/**/*.hbs"],
  },

  /**
   * --- ASSET PIPELINE ---
   * Standard Vite configuration for modern JS/TS and CSS.
   */
  build: {
    // Path aliasing for cleaner imports
    alias: { "@": "./src/components" },
    // Frontend entry point
    entry: "src/main.ts",
    // Prevents bundling of WP core libraries
    external: { jquery: "jQuery" },
    // High-performance minification
    minify: "oxc",
    // Vite plugin support (e.g., React)
    plugins: [react()],
    // Disable sourcemaps for production
    sourcemap: false,
    // Browser compatibility range
    target: "baseline-widely-available",
    // Package the result for distribution
    zip: true,
  },

  /**
   * --- DATA BRIDGE ---
   * This is the CRITICAL part. It takes the header object and
   * makes it available to your Handlebars tags in PHP.
   */
  data() {
    return {
      ...this.header,
    };
  },
});
```

## Execution

```bash
  npx wp-builder build
```
