# wp-builder

**A lightweight CLI and build tool for modern WordPress workflows**

Streamline plugin and theme development with a minimal, flexible build system
designed for speed, clarity, and developer experience.

---

## ✨ Features

- ⚡ Fast, minimal build pipeline
- 🧩 Type-safe configuration system
- 🛠 Built for WordPress plugins & themes
- 🔌 Extensible and framework-agnostic
- 📦 Clean, predictable output

---

## 🚧 Status

> Work in progress — APIs may change.

---

## ⚙️ Configuration

Create a configuration file in your project root:

```
wp-builder.config.ts
```

Example:

```ts id="cfg1"
import { defineConfig } from "wp-builder";

export default defineConfig({
  header: {
    pluginName: "My Plugin",
  },
});
```

---

## 🚀 Build

Run the build command:

```bash id="cmd1"
wp-builder build
```

This will:

- Read your `wp-builder.config.ts`
- Process your source files
- Output a production-ready WordPress build

---

## 🧠 Philosophy

`wp-builder` focuses on:

- Minimal configuration with strong defaults
- Reducing boilerplate in WordPress development
- Type-safe developer experience
- Scalable builds from small plugins to larger projects

---

## 📄 License

MIT © 2026 EMILO9
