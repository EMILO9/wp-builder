# wp-builder

> A lightweight CLI and build tool for modern WordPress plugin development

[![npm version](https://img.shields.io/npm/v/@emilo/wp-builder?color=blue&label=npm)](https://www.npmjs.com/package/@emilo/wp-builder)
[![npm downloads](https://img.shields.io/npm/dm/@emilo/wp-builder?color=green&label=downloads)](https://www.npmjs.com/package/@emilo/wp-builder)
[![license](https://img.shields.io/npm/l/@emilo/wp-builder?color=orange&label=license)](LICENSE)

## What is wp-builder?

**wp-builder** is a modern build tool that bridges the gap between contemporary JavaScript development and WordPress plugin development. It automates the entire plugin pipeline: from configuration discovery to Handlebars template compilation, asset bundling with Vite, and distribution packaging.

Think of it as **Next.js for WordPress plugins**—type-safe configuration, zero-config discovery, and a predictable build process.

## Why wp-builder?

### The Problem
- ❌ Manual script enqueuing is error-prone
- ❌ Asset management is tedious
- ❌ No built-in templating or asset optimization
- ❌ Testing and distribution are manual processes

### The Solution
- ✅ **Zero-Config Discovery** — Automatically finds your config using cosmiconfig
- ✅ **Type-Safe Configuration** — Full TypeScript support with Zod schema validation
- ✅ **Modern Templating** — Handlebars with custom helpers, partials, and global data
- ✅ **Smart Asset Bundling** — Vite-powered multi-entry bundling with automatic minification
- ✅ **Global Data Access** — Expose data to both templates and JS via a unified context
- ✅ **Distribution Ready** — Automated ZIP packaging for plugin deployment
- ✅ **Observable Pipeline** — Step-by-step progress reporting with task-based execution

## How It Works

The build pipeline is **deterministic and transparent**:

```
1. Config Discovery & Validation → Loads config, validates schema
2. Prepare Runtime Context ──────→ Sets up build environment
3. Delete Plugin Directory ──────→ Cleans output directory
4. Register Helpers ─────────────→ Loads custom Handlebars helpers
5. Register Partials ────────────→ Registers global templates
6. Render PHP Entry ─────────────→ Compiles main plugin template
7. Render PHP Includes ──────────→ Compiles all include templates
8. Bundle Assets ────────────────→ Runs Vite for JS/CSS/etc
9. Package Plugin ───────────────→ Creates ZIP archive (if enabled)
```

### Global Data Context

Templates and JavaScript have access to a unified data context with:
- **`header`** — Plugin metadata (name, version, author, etc.)
- **`paths`** — Compiled entry paths (JS and CSS files)

```typescript
data() {
  return {
    VERSION: this.header.version,
    ADMIN_JS: this.paths.admin.js,        // "admin/my-plugin-admin.js"
    FRONTEND_CSS: this.paths.frontend.css, // "frontend/my-plugin-frontend.css"
  };
}
```

## Installation

### Via npm (Recommended)

```bash
npm install -D @emilo/wp-builder
```

Add to `package.json`:

```json
{
  "scripts": {
    "build": "wp-builder build"
  }
}
```

### Via npx

```bash
npx @emilo/wp-builder build
```

## Quick Start

### Step 1: Create Configuration

Create `wp-builder.config.ts` in your project root:

```typescript
import { defineConfig } from "@emilo/wp-builder";

export default defineConfig({
  header: {
    pluginName: "My Awesome Plugin",
    version: "1.0.0",
    description: "A lightweight WordPress plugin",
    author: "Your Name",
    license: "MIT",
  },

  php: {
    entry: "src/plugin.hbs",
  },

  build: {
    entry: {
      admin: "src/admin.ts",
      frontend: "src/frontend.ts",
    },
  },

  data() {
    return {
      VERSION: this.header.version,
      ADMIN_JS: this.paths.admin.js,
    };
  },
});
```

### Step 2: Organize Your Project

```
your-plugin/
├── src/
│   ├── plugin.hbs              # Main plugin file
│   ├── admin.ts                # Admin script
│   ├── frontend.ts             # Frontend script
│   ├── includes/
│   │   ├── admin-page.hbs
│   │   └── hooks.hbs
│   └── partials/
│       └── header.hbs
├── wp-builder.config.ts
└── package.json
```

### Step 3: Build

```bash
npm run build
```

Output is created in `.plugin/my-awesome-plugin/` ready for deployment.

## Configuration Schema

### `header` (Required)

Plugin metadata for WordPress plugin header:

```typescript
header: {
  pluginName: "My Plugin",              // Required: Display name
  pluginURI?: "https://example.com",    // Plugin homepage
  description?: "Short description",    // Max 140 characters
  version?: "1.0.0",                    // Semantic version (default: 1.0.0)
  author?: ["Your Name"],               // Array of author names
  authorURI?: "https://example.com",    // Author website
  license?: "MIT",                      // License type
  licenseURI?: "https://mit.org",       // License URL
  textDomain?: "my-plugin",             // Translation domain
  domainPath?: "/languages",            // Translation files path
  requiresAtLeast?: "6.0",              // Min WordPress version
  requiresPHP?: "8.0",                  // Min PHP version
  network?: true,                       // Multisite only
  updateURI?: "https://...",            // Custom update server
  requiresPlugins?: ["woocommerce"],    // Dependencies
}
```

### `php` (Optional)

PHP/Handlebars template configuration:

```typescript
php: {
  entry: "src/plugin.hbs",                    // Main entry file
  includes: ["src/includes/**/*.{php,hbs}"],  // Files to process
  partials: ["src/partials/**/*.{php,hbs}"],  // Global partials
  helpers: {                                   // Custom helpers
    uppercase: (str) => str.toUpperCase(),
    formatDate: (date) => new Date(date).toLocaleDateString(),
  },
}
```

### `build` (Optional)

Asset bundling configuration (uses Vite):

```typescript
build: {
  entry: {                        // Multi-entry support
    admin: "src/admin.ts",
    frontend: "src/frontend.ts",
  },
  alias: {                        // Module resolution aliases
    "@components": "./src/components",
    "@utils": "./src/utils",
  },
  external: {                     // Prevent bundling
    react: "React",
    "react-dom": "ReactDOM",
    jquery: "jQuery",
  },
  target: "es2020",               // Browser compatibility
  minify: true,                   // Enable minification
  sourcemap: false,               // Source maps in production
  plugins: [],                    // Vite/Rollup plugins
  zip: false,                     // Create distribution ZIP
}
```

### `data()` (Optional)

Global data available in templates and JS:

```typescript
data() {
  return {
    VERSION: this.header.version,
    API_URL: "https://api.example.com",
    ADMIN_JS: this.paths.admin.js,
    FRONTEND_CSS: this.paths.frontend.css,
  };
}
```

**Available context:**
- `this.header` — Plugin metadata
- `this.paths` — Compiled asset paths per entry

## Usage Examples

### Example 1: Basic PHP Plugin

**wp-builder.config.ts:**
```typescript
export default defineConfig({
  header: {
    pluginName: "Hello World",
    version: "1.0.0",
  },
  php: {
    entry: "src/plugin.hbs",
  },
});
```

**src/plugin.hbs:**
```handlebars
<?php
/**
 * Plugin Name: {{pluginName}}
 * Version: {{version}}
 */

add_action('wp_footer', function() {
  echo 'Hello from {{pluginName}}!';
});
```

### Example 2: Full Stack Plugin with Assets

**wp-builder.config.ts:**
```typescript
export default defineConfig({
  header: {
    pluginName: "Dashboard Widget",
    version: "2.0.0",
  },
  build: {
    entry: {
      admin: "src/admin.ts",
    },
    external: {
      react: "React",
      "react-dom": "ReactDOM",
    },
  },
  data() {
    return {
      ADMIN_JS: this.paths.admin.js,
    };
  },
});
```

### Example 3: Data-Driven Templates

**wp-builder.config.ts:**
```typescript
export default defineConfig({
  header: {
    pluginName: "Settings Page",
    version: "1.5.0",
  },
  php: {
    entry: "src/plugin.hbs",
  },
  data() {
    return {
      MENU_SLUG: "settings-page",
      SETTINGS_KEY: "my_plugin_settings",
      API_ENDPOINT: "https://api.example.com",
    };
  },
});
```

**src/plugin.hbs:**
```handlebars
<?php
/**
 * Plugin Name: {{pluginName}}
 */

add_action('admin_menu', function() {
  add_menu_page(
    '{{pluginName}}',
    'Settings',
    'manage_options',
    '{{MENU_SLUG}}',
    'render_settings_page'
  );
});

function render_settings_page() {
  echo '<div id="app"></div>';
  echo '<script>';
  echo 'window.PLUGIN_CONFIG = { apiUrl: "{{API_ENDPOINT}}" };';
  echo '</script>';
}
```

## Advanced Features

### Custom Handlebars Helpers

```typescript
php: {
  helpers: {
    ternary: (condition, trueVal, falseVal) => condition ? trueVal : falseVal,
    multiply: (a, b) => a * b,
    isProd: () => process.env.NODE_ENV === 'production',
  },
}
```

Use in templates:
```handlebars
{{#if (isProd)}}
  Production build
{{else}}
  Development build
{{/if}}

{{ternary isAdmin "Show Admin" "Show User"}}
```

### Global Partials

Organize reusable template fragments:

```
src/partials/
├── header.hbs
├── footer.hbs
└── admin/
    ├── settings.hbs
    └── form.hbs
```

Use in templates:
```handlebars
{{> header}}
<main>{{content}}</main>
{{> footer}}
```

### Multi-Entry Bundling

```typescript
build: {
  entry: {
    admin: "src/admin.ts",
    frontend: "src/frontend.ts",
    block: "src/block.ts",
  },
}
```

Access in data:
```typescript
data() {
  return {
    ADMIN_JS: this.paths.admin.js,
    FRONTEND_JS: this.paths.frontend.js,
    BLOCK_JS: this.paths.block.js,
  };
}
```

## Build Output

After running `npm run build`, your plugin is created in `.plugin/`:

```
.plugin/
└── my-awesome-plugin/
    ├── plugin.php               # Main entry
    ├── includes/                # Processed includes
    │   ├── admin.php
    │   └── hooks.php
    ├── admin/                   # Admin assets
    │   ├── my-plugin-admin.js
    │   └── my-plugin-admin.css
    └── frontend/                # Frontend assets
        ├── my-plugin-frontend.js
        └── my-plugin-frontend.css
```

Ready to:
- ✅ Deploy directly to `/wp-content/plugins/`
- ✅ Package as ZIP for distribution
- ✅ Upload to WordPress.org plugin directory

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
- **WordPress**: 5.0+
- **PHP**: 7.4+ (recommended 8.0+)

## TypeScript Support

Full type definitions included. For IDE support in client code:

```typescript
import type { /* types */ } from "@emilo/wp-builder/client";
```

## Best Practices

1. **Use TypeScript** — Full IDE autocompletion and type checking
2. **Keep PHP templates minimal** — Use helpers for logic
3. **Leverage global data** — Don't hardcode values
4. **Modularize assets** — Use multiple entries for different contexts
5. **Version consistently** — Use semantic versioning
6. **Document helpers** — Add JSDoc comments to custom helpers

## Troubleshooting

### Config not found
Ensure `wp-builder.config.ts` exists in your project root. wp-builder searches for:
- `wp-builder.config.ts`
- `wp-builder.config.js`
- `.wp-builderrc`
- `.wp-builderrc.ts`

### Build fails with "No entries specified"
Either add a `build.entry` config or remove the `build` section if you only need PHP.

### Assets not appearing
Check:
1. Entry paths in config match actual files
2. Assets are in the correct output directory
3. Enqueue scripts with correct paths

## License

MIT © [EMILO9](https://github.com/EMILO9)

## Contributing

Contributions welcome! Please open an issue or PR on [GitHub](https://github.com/EMILO9/wp-builder).
