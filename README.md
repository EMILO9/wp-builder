# wp-builder

> A lightweight CLI and build tool for modern WordPress plugin development

[![npm version](https://img.shields.io/npm/v/@emilo/wp-builder?color=blue&label=npm)](https://www.npmjs.com/package/@emilo/wp-builder)
[![npm downloads](https://img.shields.io/npm/dm/@emilo/wp-builder?color=green&label=downloads)](https://www.npmjs.com/package/@emilo/wp-builder)
[![license](https://img.shields.io/npm/l/@emilo/wp-builder?color=orange&label=license)](LICENSE)

## What is wp-builder?

**wp-builder** brings professional JavaScript development practices to WordPress plugins. Think of it as **Next.js for WordPress plugins**—with type-safe configuration, zero-config discovery, and a predictable build process.

### Key Features

| Feature | Description |
|---------|-------------|
| 🔍 **Zero-Config Discovery** | Auto-finds your config using cosmiconfig |
| 🔐 **Type-Safe Configuration** | Full TypeScript + Zod schema validation |
| 🎨 **Modern Templating** | Handlebars with helpers, partials & global data |
| ⚡ **Smart Asset Bundling** | Vite-powered multi-entry bundling with minification |
| 📁 **File Management** | Copy static files and assets with glob patterns |
| 🌍 **Global Data Context** | Unified data for templates and JavaScript |
| 📦 **Distribution Ready** | One-command ZIP packaging |
| 👀 **Observable Pipeline** | Real-time progress with task-based execution |

---

## Installation

### npm (Recommended)

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

### npx

```bash
npx @emilo/wp-builder build
```

---

## Quick Start in 4 Steps

### Step 1: Create Configuration File

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
    copy: ["readme.txt", "LICENSE", "assets/**"],
  },
});
```

### Step 2: Organize Your Project

```
your-plugin/
├── src/
│   ├── plugin.hbs                # Main plugin template
│   ├── admin.ts                  # Admin entry point
│   ├── frontend.ts               # Frontend entry point
│   └── includes/
│       ├── hooks.hbs
│       └── admin-page.hbs
├── assets/                       # Static files to copy
│   ├── banner.jpg
│   └── icon.png
├── readme.txt                    # Will be copied
├── LICENSE                       # Will be copied
├── wp-builder.config.ts
└── package.json
```

### Step 3: Write Your Plugin

**src/plugin.hbs:**

```handlebars
<?php
/**
 * Plugin Name: {{pluginName}}
 * Version: {{version}}
 * Description: {{description}}
 * Author: {{author}}
 * License: {{license}}
 */

add_action('wp_enqueue_scripts', function() {
  wp_enqueue_script('frontend', '{{FRONTEND_JS}}', [], '{{VERSION}}');
});

add_action('admin_enqueue_scripts', function() {
  wp_enqueue_script('admin', '{{ADMIN_JS}}', [], '{{VERSION}}');
});
```

### Step 4: Build

```bash
npm run build
```

✅ Your plugin is ready in `.plugin/my-awesome-plugin/`

---

## Configuration Reference

### `header` — Plugin Metadata

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `pluginName` | `string` | ✅ | Display name for the plugin |
| `version` | `string` | ❌ | Semantic version (default: `1.0.0`) |
| `description` | `string` | ❌ | Short description (max 140 chars) |
| `author` | `string \| string[]` | ❌ | Author name(s) |
| `authorURI` | `string` | ❌ | Author website URL |
| `license` | `string` | ❌ | License type (e.g., `MIT`, `GPL-2.0`) |
| `licenseURI` | `string` | ❌ | License URL |
| `pluginURI` | `string` | ❌ | Plugin homepage URL |
| `textDomain` | `string` | ❌ | Translation domain (default: plugin slug) |
| `domainPath` | `string` | ❌ | Path to translation files (e.g., `/languages`) |
| `requiresAtLeast` | `string` | ❌ | Minimum WordPress version (e.g., `5.0`) |
| `requiresPHP` | `string` | ❌ | Minimum PHP version (e.g., `7.4`) |
| `network` | `boolean` | ❌ | Multisite only plugin (default: `false`) |
| `updateURI` | `string` | ❌ | Custom update server URL |
| `requiresPlugins` | `string[]` | ❌ | Dependencies (e.g., `['woocommerce']`) |

**Example:**

```typescript
header: {
  pluginName: "My Plugin",
  version: "1.0.0",
  description: "A powerful WordPress plugin",
  author: ["John Doe", "Jane Smith"],
  license: "MIT",
  requiresAtLeast: "6.0",
  requiresPHP: "8.0",
}
```

---

### `php` — Template Configuration

| Option | Type | Description |
|--------|------|-------------|
| `entry` | `string` | Main plugin template file (e.g., `src/plugin.hbs`) |
| `includes` | `string[]` | Glob patterns for PHP/HBS includes to process |
| `partials` | `string[]` | Glob patterns for reusable template fragments |
| `helpers` | `Record<string, Function>` | Custom Handlebars helper functions |

**Example:**

```typescript
php: {
  entry: "src/plugin.hbs",
  includes: ["src/includes/**/*.{php,hbs}"],
  partials: ["src/partials/**/*.{php,hbs}"],
  helpers: {
    uppercase: (str) => str.toUpperCase(),
    formatDate: (date) => new Date(date).toLocaleDateString(),
    ternary: (cond, yes, no) => cond ? yes : no,
  },
}
```

---

### `build` — Asset Management & Bundling

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entry` | `Record<string, string>` | `{ main: "src/index.ts" }` | JavaScript/TypeScript entry points |
| `alias` | `Record<string, string>` | `{}` | Module resolution aliases |
| `external` | `Record<string, string>` | `{}` | External dependencies (not bundled) |
| `target` | `"es2016" \| "es2017" \| ... \| "esnext"` | `"baseline-widely-available"` | Browser compatibility target |
| `minify` | `boolean \| "oxc" \| "terser" \| "esbuild"` | `true` | Minification strategy |
| `sourcemap` | `boolean \| "inline" \| "hidden"` | `false` | Source map generation |
| `plugins` | `any[]` | `[]` | Vite/Rollup plugins |
| `zip` | `boolean` | `false` | Create distribution ZIP file |
| `copy` | `string[]` | `[]` | Glob patterns for static files to copy |

**Example:**

```typescript
build: {
  entry: {
    admin: "src/admin.ts",
    frontend: "src/frontend.ts",
  },
  alias: {
    "@components": "./src/components",
    "@utils": "./src/utils",
  },
  external: {
    react: "React",
    "react-dom": "ReactDOM",
    jquery: "jQuery",
  },
  target: "es2020",
  minify: true,
  sourcemap: false,
  zip: false,
  copy: [
    "readme.txt",
    "LICENSE",
    "assets/**",
    "docs/**",
  ],
}
```

#### Copy Patterns

Use glob patterns to include static files in your plugin:

| Pattern | Matches | Example |
|---------|---------|---------|
| `"readme.txt"` | Single file | Copies `readme.txt` to plugin root |
| `"LICENSE"` | Single file | Copies `LICENSE` to plugin root |
| `"assets/**"` | Directory recursively | All files in `assets/` |
| `"languages/*.po"` | Specific types | Only `.po` files in `languages/` |
| `"screenshots/**/*.png"` | Nested patterns | All `.png` files recursively |

**Key Behaviors:**
- ✅ Files maintain their relative path structure
- ✅ Build output (`.plugin/`) is automatically excluded
- ✅ Files outside project root are copied by filename only
- ✅ Enable `zip: true` to include copied files in distribution

---

### `data()` — Global Context Function

Make data available in templates and JavaScript:

```typescript
data() {
  return {
    VERSION: this.header.version,           // From config
    API_URL: "https://api.example.com",     // Custom constant
    ADMIN_JS: this.paths.admin.js,          // Auto-generated path
    FRONTEND_CSS: this.paths.frontend.css,  // Auto-generated path
  };
}
```

| Available in `this` | Type | Description |
|-------------------|------|-------------|
| `this.header` | `object` | Your plugin metadata from config |
| `this.paths` | `object` | Compiled asset paths per entry |

**Example with asset paths:**

```typescript
// Given this config
build: {
  entry: {
    admin: "src/admin.ts",
    frontend: "src/frontend.ts",
  },
}

// this.paths contains:
{
  admin: {
    js: "admin/my-plugin-admin.js",
    css: "admin/my-plugin-admin.css",
  },
  frontend: {
    js: "frontend/my-plugin-frontend.js",
    css: "frontend/my-plugin-frontend.css",
  },
}
```

---

## Build Pipeline

### How It Works

| Step | Task | Purpose |
|------|------|---------|
| 1️⃣ | Config Discovery & Validation | Loads and validates `wp-builder.config.ts` |
| 2️⃣ | Prepare Runtime Context | Sets up build environment and paths |
| 3️⃣ | Delete Plugin Directory | Cleans output directory for fresh build |
| 4️⃣ | Register Helpers | Loads custom Handlebars helpers |
| 5️⃣ | Register Partials | Registers global template fragments |
| 6️⃣ | Render PHP Entry | Compiles main plugin template |
| 7️⃣ | Render PHP Includes | Compiles all include templates |
| 8️⃣ | Bundle Assets | Runs Vite for JS/CSS/etc |
| 9️⃣ | Copy Assets | Copies static files with glob patterns |
| 🔟 | Package Plugin | Creates ZIP archive (if enabled) |

### Data Flow

```
wp-builder.config.ts
        ↓
    data() function executed
        ↓
    Returns global context
        ↓
    ├→ Injected into Handlebars templates
    ├→ Available as constants in JavaScript
    └→ Accessible in PHP via global data
```

---

## Usage Examples

### Example 1: Simple PHP Plugin

**Config:**

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

---

### Example 2: Plugin with React Admin Dashboard

**Config:**

```typescript
export default defineConfig({
  header: {
    pluginName: "Dashboard Widget",
    version: "2.0.0",
    description: "Admin dashboard with React",
  },
  build: {
    entry: { admin: "src/admin.tsx" },
    external: {
      react: "React",
      "react-dom": "ReactDOM",
    },
  },
  data() {
    return { ADMIN_JS: this.paths.admin.js };
  },
});
```

**src/plugin.hbs:**

```handlebars
<?php
/**
 * Plugin Name: {{pluginName}}
 */

add_action('admin_enqueue_scripts', function() {
  wp_enqueue_script('react', 'https://unpkg.com/react@18/umd/react.production.min.js');
  wp_enqueue_script('react-dom', 'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js');
  wp_enqueue_script('admin', '{{ADMIN_JS}}', [], '{{VERSION}}');
  wp_localize_script('admin', 'PLUGIN', { nonce: wp_create_nonce('admin') });
});
```

---

### Example 3: Plugin with Static Assets & Documentation

**Config:**

```typescript
export default defineConfig({
  header: {
    pluginName: "Media Manager",
    version: "1.5.0",
    description: "Manage media with custom assets",
  },
  build: {
    copy: [
      "readme.txt",
      "LICENSE",
      "CHANGELOG.md",
      "assets/images/**",
      "assets/fonts/**",
    ],
  },
});
```

**Project Structure:**

```
media-manager/
├── src/plugin.hbs
├── assets/
│   ├── images/
│   │   ├── banner.jpg
│   │   ├── icon.png
│   │   └── screenshots/
│   │       ├── screen-1.png
│   │       └── screen-2.png
│   └── fonts/
│       └── custom.woff2
├── readme.txt
├── LICENSE
├── CHANGELOG.md
└── wp-builder.config.ts
```

**Build Output:**

```
.plugin/media-manager/
├── plugin.php
├── readme.txt              ← Copied
├── LICENSE                 ← Copied
├── CHANGELOG.md            ← Copied
└── assets/
    ├── images/
    │   ├── banner.jpg      ← Copied
    │   ├── icon.png        ← Copied
    │   └── screenshots/     ← Copied
    └── fonts/
        └── custom.woff2    ← Copied
```

---

### Example 4: Multi-Entry Plugin with Global Data

**Config:**

```typescript
export default defineConfig({
  header: {
    pluginName: "Settings Manager",
    version: "1.0.0",
  },
  build: {
    entry: {
      admin: "src/admin.ts",
      frontend: "src/frontend.ts",
      block: "src/block.ts",
    },
  },
  data() {
    return {
      VERSION: this.header.version,
      MENU_SLUG: "settings-manager",
      API_URL: "https://api.example.com",
      ADMIN_JS: this.paths.admin.js,
      ADMIN_CSS: this.paths.admin.css,
      FRONTEND_JS: this.paths.frontend.js,
      BLOCK_JS: this.paths.block.js,
    };
  },
});
```

---

## Advanced Features

### Custom Handlebars Helpers

```typescript
php: {
  helpers: {
    ternary: (cond, yes, no) => cond ? yes : no,
    multiply: (a, b) => a * b,
    isProd: () => process.env.NODE_ENV === 'production',
    truncate: (str, len) => str.substring(0, len) + '...',
  },
}
```

**Usage in templates:**

```handlebars
{{#if (isProd)}}
  Production Build
{{else}}
  Development Build
{{/if}}

{{ternary isAdmin "Show Admin" "Show User"}}

{{truncate description 50}}
```

---

### Template Partials

Organize reusable template fragments:

**Directory structure:**

```
src/partials/
├── header.hbs
├── footer.hbs
├── admin/
│   ├── form.hbs
│   ├── table.hbs
│   └── settings.hbs
└── frontend/
    └── card.hbs
```

**Usage:**

```handlebars
{{> header}}

<main>
  {{> admin/form}}
  {{> admin/settings}}
</main>

{{> footer}}
```

---

### Multi-Entry Bundling

Create separate bundles for different contexts:

```typescript
build: {
  entry: {
    admin: "src/admin.ts",         // → admin/my-plugin-admin.js
    frontend: "src/frontend.ts",   // → frontend/my-plugin-frontend.js
    block: "src/block.ts",         // → block/my-plugin-block.js
  },
}
```

**Access in templates:**

```handlebars
<?php
wp_enqueue_script('admin', '{{ADMIN_JS}}');
wp_enqueue_script('frontend', '{{FRONTEND_JS}}');
wp_enqueue_script('block', '{{BLOCK_JS}}');
```

---

### Module Aliases

Keep imports clean with path aliases:

```typescript
build: {
  alias: {
    "@components": "./src/components",
    "@utils": "./src/utils",
    "@types": "./src/types",
    "@hooks": "./src/hooks",
  },
}
```

**Usage:**

```typescript
// Before
import Button from '../../../components/Button';
import { formatDate } from '../../../utils/dates';

// After
import Button from '@components/Button';
import { formatDate } from '@utils/dates';
```

---

## Supported File Types

### Templates & Markup

| Extension | Purpose | Processed |
|-----------|---------|-----------|
| `.hbs` | Handlebars template | ✅ Yes |
| `.php` | PHP code | ✅ Yes (in php config) |

### Assets (Bundled with Vite)

| Type | Extensions | Minified |
|------|-----------|----------|
| **Scripts** | `.ts`, `.js`, `.tsx`, `.jsx` | ✅ Yes |
| **Styles** | `.css`, `.scss`, `.sass` | ✅ Yes |
| **Media** | `.png`, `.jpg`, `.gif`, `.svg`, `.webp` | ✅ Yes |
| **Fonts** | `.woff`, `.woff2`, `.ttf`, `.otf` | ✅ No |

### Static Files (Via Copy)

| Type | Extensions | Examples |
|------|-----------|----------|
| **Documentation** | `.md`, `.txt` | `readme.txt`, `CHANGELOG.md` |
| **Licenses** | `.md`, `.txt` | `LICENSE`, `LICENSE.md` |
| **Config** | `.json`, `.xml` | Settings files |
| **Any** | `*` | Any file type |

---

## Build Output

After running `npm run build`:

```
.plugin/
└── my-awesome-plugin/
    ├── plugin.php                    # Main entry point
    ├── admin/
    │   ├── my-plugin-admin.js        # Bundled & minified
    │   ├── my-plugin-admin.css       # Bundled & minified
    │   └── my-plugin-admin.js.map    # Optional source map
    ├── frontend/
    │   ├── my-plugin-frontend.js
    │   ├── my-plugin-frontend.css
    │   └── my-plugin-frontend.js.map
    ├── block/
    │   ├── my-plugin-block.js
    │   └── my-plugin-block.css
    ├── includes/
    │   ├── admin.php                 # Processed includes
    │   ├── hooks.php
    │   └── settings.php
    ├── assets/                       # Copied static files
    │   ├── banner.jpg
    │   ├── icon.png
    │   └── screenshots/
    ├── readme.txt                    # Copied
    └── LICENSE                       # Copied
```

### Deployment Options

| Target | Method | Zip Needed |
|--------|--------|-----------|
| Local WordPress | Copy `.plugin/my-plugin/` to `/wp-content/plugins/` | ❌ No |
| WordPress.org | Upload as ZIP | ✅ Yes (set `zip: true`) |
| Distribution | Create ZIP archive | ✅ Yes (set `zip: true`) |
| GitHub Releases | Upload ZIP artifact | ✅ Yes (set `zip: true`) |

---

## Troubleshooting

### Config not found

**Error:** `Config not found`

**Solution:** wp-builder searches for config in this order:

| File | Location |
|------|----------|
| `wp-builder.config.ts` | Project root |
| `wp-builder.config.js` | Project root |
| `.wp-builderrc.ts` | Project root |
| `.wp-builderrc.js` | Project root |

Create one in your project root.

---

### Build fails with "No entries specified"

**Error:** `No entries specified`

**Solution:** You have `build` in config but no `entry` defined.

**Fix:**
- Add entries: `build: { entry: { admin: "src/admin.ts" } }`
- Or remove `build` section if you only need PHP

---

### Assets not appearing in output

**Checklist:**

| Issue | Solution |
|-------|----------|
| Scripts not enqueuing | Verify paths match: `wp_enqueue_script(..., this.paths.admin.js)` |
| CSS not loading | Check generated paths: `ls .plugin/my-plugin/admin/` |
| Files missing | Check entry config matches actual files: `ls src/admin.ts` |
| Double bundling | Verify `external` config prevents bundling jQuery, React, etc. |

---

### Copy patterns not matching files

**Checklist:**

| Issue | Solution |
|-------|----------|
| Pattern syntax wrong | Use glob syntax: `assets/**`, `readme.txt` |
| Files not found | Verify from project root: `ls assets/` |
| Accidental negation | Check patterns don't have `!` |
| Outside root | Files outside project root copy by name only |

---

## System Requirements

| Requirement | Version |
|-------------|---------|
| **Node.js** | 18.0.0+ |
| **npm** | 9.0.0+ |
| **WordPress** | 5.0+ |
| **PHP** | 7.4+ (recommended 8.0+) |

---

## Best Practices

| Practice | Reason |
|----------|--------|
| Use TypeScript | Better IDE support, type safety, fewer bugs |
| Keep templates simple | Move complex logic to helpers and filters |
| Use global data | Avoid hardcoding values, easier maintenance |
| Modularize entries | Separate admin/frontend to reduce bundle size |
| Copy strategically | Use specific patterns, avoid `**/*` |
| Version semantically | MAJOR.MINOR.PATCH helps users understand changes |
| Document helpers | JSDoc comments help teammates understand code |
| Test locally | Deploy to local WordPress before distribution |

---

## License

MIT © [EMILO9](https://github.com/EMILO9)

## Contributing

Contributions are welcome! Please:

1. [Open an issue](https://github.com/EMILO9/wp-builder/issues) to discuss changes
2. [Create a pull request](https://github.com/EMILO9/wp-builder/pulls) with your improvements
3. Include tests and documentation updates
