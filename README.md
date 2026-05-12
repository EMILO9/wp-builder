<h1
	align="center"
	style="font-family: &quot;Orbitron&quot;, monospace; font-size: 4em"
>
	WP-Builder
</h1>

<p align="center">
	⚡ Build WordPress plugins from modern JavaScript projects ⚡
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
	<strong>WP-Builder</strong> is a build tool that compiles modern JavaScript projects into production-ready WordPress plugins.
	It handles multi-entry builds, asset bundling, and plugin packaging through a streamlined CLI workflow.
</p>

<hr />

<h2>Install</h2>

<pre>
npm install @emilo/wp-builder
</pre>

<hr />

<h2>CLI Usage</h2>

<pre>
npx wp-builder build
</pre>

<hr />

<h2>Features</h2>

<ul>
	<li>🚀 Build WordPress plugins from modern JavaScript projects</li>
	<li>⚡ Multi-entry support powered by Vite</li>
	<li>🧵 Concurrent builds for multiple entry points</li>
	<li>🔍 Glob-based source discovery and file matching</li>
	<li>🧩 Modular task-based build pipeline</li>
	<li>📦 Automatic plugin packaging and archive generation</li>
	<li>📋 Clear, structured build output for easier debugging</li>
</ul>

<hr />

<h2>What it does</h2>

<p>
WP-Builder takes your JavaScript project, processes multiple entry points, bundles assets using Vite,
and outputs a ready-to-use WordPress plugin package.
</p>

<hr />

<h2>Example Workflow</h2>

<pre>
1. Define plugin source files
2. Run wp-builder build
3. Assets are bundled via Vite
4. Plugin is generated and packaged
</pre>

<hr />

<h2>Output</h2>

<p>
The final build produces a structured WordPress plugin directory ready for deployment or distribution.
</p>
