<h1 align="center" style="font-family: &quot;Orbitron&quot;, monospace; font-size: 4em">
	WP-Builder
</h1>

<p align="center">
	⚡ Build modern, multi-entry WordPress plugins with integrated Handlebars templating ⚡
</p>

<p align="center">
	<img src="https://img.shields.io/npm/v/@emilo/wp-builder?color=blue&label=npm" alt="npm version" />
	<img src="https://img.shields.io/npm/dm/@emilo/wp-builder?color=green&label=downloads" alt="downloads" />
	<img src="https://img.shields.io/npm/l/@emilo/wp-builder?color=orange&label=license" alt="license" />
</p>

<hr />

<h2>Overview</h2>

<p>
	<strong>WP-Builder</strong> is an opinionated, high-performance build system for WordPress developers. 
    It bridges the gap between modern frontend tooling (Vite) and WordPress's specific PHP requirements by providing an automated pipeline that compiles Handlebars templates into production-ready PHP.
</p>

<hr />

<h2>Features</h2>

<ul>
	<li>🚀 <strong>Modern Stack:</strong> Build using TypeScript, Handlebars, and Vite.</li>
	<li>⚙️ <strong>Handlebars-to-PHP Pipeline:</strong> Automatically process <code>.hbs</code> or <code>.php</code> files into compliant WordPress include structures.</li>
	<li>🧩 <strong>Modular Templating:</strong> Support for global partials and custom Handlebars helpers.</li>
	<li>⚡ <strong>Vite-Powered:</strong> Multi-entry bundling with support for React, TypeScript, and modern minification (Oxc/Esbuild).</li>
	<li>📦 <strong>Automated Packaging:</strong> Zero-config ZIP creation for plugin distribution.</li>
	<li>🧠 <strong>Unified Context:</strong> A single <code>data()</code> source of truth shared between PHP and JS.</li>
</ul>

<hr />

<h2>Configuration</h2>

<p>
Use the <code>defineConfig</code> utility to define your plugin architecture.
</p>

<pre lang="typescript">
import { defineConfig } from "@emilo/wp-builder";
import react from "@vitejs/plugin-react";

export default defineConfig({
	header: { 
        pluginName: "My Awesome Plugin",
        version: "1.0.0" 
    },

	php: {
		entry: "src/plugin.hbs",
		includes: ["src/includes/**/*.{php,hbs}"],
        partials: ["src/partials/**/*.{php,hbs}"],
		helpers: {
            uppercase: (str: string) => str.toUpperCase()
        }
	},

	build: {
		entry: { admin: "src/admin.ts" },
        plugins: [react()],
		zip: true
	},

	data() {
		return { ...this.header };
	}
});
</pre>

<hr />

<h2>How it works</h2>

<p>
WP-Builder operates on a "Discover & Transform" lifecycle:
</p>

<ol>
    <li><strong>Discover:</strong> Scans your source directories using glob patterns.</li>
    <li><strong>Transform:</strong> Compiles <code>.hbs</code> templates into <code>.php</code> files, injecting your <code>data()</code> context.</li>
    <li><strong>Bundle:</strong> Executes Vite for all assets, mapping output to your WordPress staging environment.</li>
    <li><strong>Package:</strong> Optionally creates a versioned ZIP file ready for installation.</li>
</ol>

<hr />

<h2>CLI</h2>

<pre>
npx wp-builder build
</pre>

<p>The build process provides full visibility into every sub-task, ensuring you can debug your templating and bundling steps in real-time.</p>
