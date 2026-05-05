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

export default defineConfig({
  header: {
    pluginName: "My Plugin!",
    version: "1.0.0",
    author: ["Anonymous"],
    description: "My Awesome Plugin!",
    textDomain: "my-plugin",
    requiresAtLeast: "6.9.0",
    requiresPHP: "7.4",
  },
  php: {
    entry: "php/plugin.php", // Main file with HBS template support
    sources: ["php/includes/**/*.php"], // Automatically mapped to staging
    partials: ["src/partials/**/*.hbs"], // Reusable template components
    helpers: {
      uppercase: (v: string) => v.toUpperCase(), // Custom logic for PHP templates
    },
  },
  build: {
    entry: "src/main.ts",
    alias: { "@": "./src/components" },
    external: { jquery: "jQuery" }, // Keep bundles small by using WP globals
    plugins: [react()], // Full Vite plugin ecosystem support
    minify: "oxc", // High-performance Rust-based minifier
    zip: true, // Auto-generate distribution ZIP
  },
  data() {
    return {
      ...this.header, // Expose header data to Handlebars context
    };
  },
});
```

## Execution

```bash
  npx wp-builder build
```
