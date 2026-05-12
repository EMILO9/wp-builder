<h1
	align="center"
	style="font-family: &quot;Orbitron&quot;, monospace; font-size: 4em"
>
	WP-Builder
</h1>

<p align="center">
	⚡ Build modern, multi-entry WordPress plugins from JavaScript ⚡
</p>

<p align="center">
	<img
		src="https://img.shields.io/npm/v/@emilo/wp-builder?color=blue&label=npm"
		alt="npm version"
	/>
	<img
		src="https://img.shields.io/npm/dm/@emilo/wp-builder?color=green&label=downloads"
		alt="downloads"
	/>
	<img
		src="https://img.shields.io/npm/l/@emilo/wp-builder?color=orange&label=license"
		alt="license"
	/>
</p>

<hr />

<h2>Overview</h2>

<p>
	<strong>WP-Builder</strong> is a build system for creating WordPress plugins from modern JavaScript projects.
	It supports multi-entry builds, PHP templating, asset bundling, and configurable plugin architecture through a single unified config.
</p>

<hr />

<h2>Install</h2>

<pre>
npm install @emilo/wp-builder
</pre>

<hr />

<h2>CLI</h2>

<pre>
npx wp-builder build
</pre>

<hr />

<h2>Features</h2>

<ul>
	<li>🚀 Build WordPress plugins from modern JavaScript/TypeScript projects</li>
	<li>⚡ Multi-entry builds powered by Vite</li>
	<li>🧵 Concurrent build execution for multiple entry points</li>
	<li>🔍 Glob-based PHP source discovery and inclusion</li>
	<li>🧩 Handlebars support for PHP templating</li>
	<li>🧠 Custom helpers and partials for template composition</li>
	<li>📦 Automatic plugin packaging with optional ZIP output</li>
	<li>📋 Structured, readable build output for debugging</li>
</ul>

<hr />

<h2>Configuration</h2>

<p>
WP-Builder is configured using a single <code>defineConfig</code> function.
</p>

<pre>
import { defineConfig } from "@emilo/wp-builder";

export default defineConfig({
	header: { pluginName: "My Plugin!" },

	php: {
		entry: "plugin.php",
		sources: ["languages", "includes/**/*.php"]
	},

	build: {
		entry: {
			index: "index.ts",
			test: "test.ts"
		},
		zip: true
	},

	data() {
		return {
			...this.header,
		};
	}
});
</pre>

<hr />

<h2>How it works</h2>

<ul>
	<li><strong>header</strong> → Plugin metadata and configuration</li>
	<li><strong>build</strong> → Vite-based multi-entry bundling</li>
	<li><strong>php</strong> → PHP entry + glob-based source inclusion</li>
	<li><strong>data()</strong> → Shared context available in Vite + PHP templates</li>
</ul>

<hr />

<h2>Templating</h2>

<p>
WP-Builder supports <strong>Handlebars</strong> for PHP generation, including:
</p>

<ul>
	<li>Custom helpers</li>
	<li>Reusable partials</li>
	<li>Shared build-time data context</li>
</ul>

<hr />

<h2>Data Context</h2>

<p>
The <code>data()</code> function provides a shared context accessible in:
</p>

<ul>
	<li>Vite <code>define</code> environment</li>
	<li>PHP entry files</li>
	<li>PHP source files</li>
</ul>
