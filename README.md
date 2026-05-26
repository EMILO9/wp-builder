# wp-builder

> A lightweight CLI and build tool for modern WordPress plugin development

[![npm version](https://img.shields.io/npm/v/@emilo/wp-builder?color=blue&label=npm)](https://www.npmjs.com/package/@emilo/wp-builder)
[![npm downloads](https://img.shields.io/npm/dm/@emilo/wp-builder?color=green&label=downloads)](https://www.npmjs.com/package/@emilo/wp-builder)
[![license](https://img.shields.io/npm/l/@emilo/wp-builder?color=orange&label=license)](LICENSE)

## Overview

**wp-builder** is a CLI tool that streamlines WordPress plugin development with a modern build pipeline. It combines configuration discovery, Handlebars templating, asset bundling with Vite, and automated plugin packaging into a single, cohesive workflow.

Use cosmiconfig for flexible configuration discovery, write templates in Handlebars that compile to WordPress-compliant PHP, bundle your assets with Vite, and generate distribution-ready plugins.

## Features

- 🔧 **Zero-Config Discovery**: Automatically finds and loads your plugin configuration using [cosmiconfig](https://github.com/cosmiconfig/cosmiconfig)
- 📝 **Handlebars Templating**: Write `.hbs` templates that compile to PHP with global helpers and partials
- ⚡ **Vite Bundling**: Multi-entry asset bundling with TypeScript, React, and modern minification
- 📦 **Plugin Packaging**: Automated ZIP creation for plugin distribution
- 🎯 **Type-Safe Config**: Full TypeScript support with schema validation via Zod
- 🔄 **Task-Based Pipeline**: Clear, observable build steps with progress reporting

## Installation

```bash
npm install -D @emilo/wp-builder
```

Or use it directly via npx:

```bash
npx @emilo/wp-builder build
```

## Quick Start

### 1. Create a Configuration File

Create `wp-builder.config.ts` in your project root:

```typescript
import { defineConfig } from "@emilo/wp-builder";

export default defineConfig({
  // Required: Plugin metadata
  header: {
    pluginName: "My Awesome Plugin",
    pluginURI: "https://example.com",
    description: "A cool WordPress plugin",
    version: "1.0.0",
    author: "You",
    license: "MIT",
  },

  // Optional: PHP template configuration
  php: {
    entry: "src/plugin.hbs",           // Main entry point
    includes: "src/includes/**/*.hbs",  // Files to process
    partials: "src/partials/**/*.hbs",  // Global partials
    helpers: {
      uppercase: (str: string) => str.toUpperCase(),
    },
  },

  // Optional: Asset bundling
  build: {
    entry: {
      admin: "src/admin.ts",
      frontend: "src/frontend.ts",
    },
  },

  // Optional: Global data available in templates
  data() {
    return {
      API_URL: "https://api.example.com",
      VERSION: this.header.version,
    };
  },
});
```

### 2. Organize Your Project

```
your-plugin/
├── src/
│   ├── plugin.hbs          # Main plugin file (rendered to PHP)
│   ├── includes/
│   │   └── admin.hbs       # Include files (rendered to PHP)
│   ├── partials/
│   │   └── header.hbs      # Reusable partials
│   ├── admin.ts            # Admin script
│   └── frontend.ts         # Frontend script
├── wp-builder.config.ts
└── package.json
```

### 3. Run the Build

```bash
npm run build
```

The build process will:
1. ✅ Discover and validate your configuration
2. 📋 Prepare the runtime context
3. 🗑️ Clean the output directory
4. 🔧 Register Handlebars helpers and partials
5. 📝 Render the PHP entry template
6. 📂 Process all PHP/Handlebars includes
7. ⚡ Bundle assets with Vite
8. 📦 Create a distribution-ready ZIP (if enabled)

## Build Pipeline

The CLI follows a deterministic, step-by-step pipeline:

| Step | Task | Purpose |
|------|------|---------|
| 1 | Config Discovery & Validation | Loads config using cosmiconfig |
| 2 | Prepare Runtime Context | Sets up build environment |
| 3 | Delete Plugin Directory | Cleans output directory |
| 4 | Register Helpers | Registers custom Handlebars helpers |
| 5 | Register Partials | Loads global partial templates |
| 6 | Render PHP Entry | Compiles main plugin template |
| 7 | Render PHP Includes | Compiles all include templates |
| 8 | Bundle Assets | Runs Vite for JS/CSS/etc |
| 9 | Package Plugin | Creates ZIP archive (optional) |

## Configuration Schema

### `header` (Required)

Plugin metadata. At minimum, provide `pluginName`:

```typescript
header: {
  pluginName: "My Plugin",           // Required
  pluginURI?: "https://...",
  description?: "...",
  version?: "1.0.0",
  author?: "...",
  authorURI?: "https://...",
  license?: "MIT",
  licenseURI?: "https://...",
  textDomain?: "my-plugin",
  domainPath?: "/languages",
  requiresWP?: "6.0",
  requiresPHP?: "8.0",
  testedUpTo?: "6.4",
}
```

### `php` (Optional)

Configure PHP/Handlebars file processing:

```typescript
php: {
  entry: "src/plugin.hbs",           // Main entry point
  includes: ["src/includes/**/*.{php,hbs}"],
  partials: ["src/partials/**/*.{php,hbs}"],
  helpers: {
    customHelper: (value: string) => value.toUpperCase(),
  },
}
```

### `build` (Optional)

Configure asset bundling:

```typescript
build: {
  entry: {
    admin: "src/admin.ts",
    frontend: "src/frontend.ts",
  },
  zip: true,  // Create distribution ZIP
}
```

### `data()` (Optional)

Define global variables available in templates:

```typescript
data() {
  return {
    VERSION: this.header.version,
    API_URL: "https://api.example.com",
  };
}
```

These values are injected as global constants in the build and exposed to templates.

## Usage Examples

### Basic PHP Plugin with Handlebars

**src/plugin.hbs:**
```handlebars
<?php
/**
 * Plugin Name: {{pluginName}}
 * Version: {{version}}
 */

echo "Hello from {{pluginName}} v{{version}}";
?>
```

**wp-builder.config.ts:**
```typescript
export default defineConfig({
  header: { pluginName: "Hello Plugin", version: "1.0.0" },
  php: { entry: "src/plugin.hbs" },
});
```

### Multi-Entry Asset Bundling

**wp-builder.config.ts:**
```typescript
export default defineConfig({
  header: { pluginName: "Full Stack Plugin" },
  build: {
    entry: {
      admin: "src/admin.ts",
      frontend: "src/frontend.ts",
    },
  },
});
```

### Global Data in Templates

**src/plugin.hbs:**
```handlebars
<?php
define('PLUGIN_VERSION', '{{VERSION}}');
define('API_URL', '{{API_URL}}');
?>
```

**wp-builder.config.ts:**
```typescript
export default defineConfig({
  header: { pluginName: "My Plugin", version: "1.0.0" },
  data() {
    return {
      VERSION: this.header.version,
      API_URL: "https://api.example.com",
    };
  },
});
```

## API Reference

### `defineConfig(config: UserConfig)`

Type-safe configuration helper. Use this in your config file for IDE autocompletion and validation.

```typescript
import { defineConfig } from "@emilo/wp-builder";

export default defineConfig({ /* ... */ });
```

## Supported File Types

### Templates
- `.hbs` (Handlebars)
- `.php` (PHP)

### Assets
- **Scripts**: `.ts`, `.js`
- **Styles**: `.css`, `.scss`, `.sass`
- **Media**: `.png`, `.jpg`, `.svg`, `.webp`, etc.
- **Fonts**: `.woff`, `.woff2`, `.ttf`, `.otf`

## Requirements

- **Node.js**: 18+
- **WordPress**: 5.0+ (depends on your plugin code)

## TypeScript Support

Full type definitions are included. For best IDE support in client code, import from the client module:

```typescript
import type { /* types */ } from "@emilo/wp-builder/client";
```

## License

MIT © [EMILO9](https://github.com/EMILO9)
