import "@/style.css";
import $ from "jquery";

$(() => {
  const $root = $(`#${__DATA__.appID}`);

  if (!$root.length) {
    console.warn("Admin root element not found.");
    return;
  }

  const toolName = "WP Builder";

  $root.html(`
    <div class="admin-wrap">
      <h1>${toolName}</h1>

      <div class="admin-subtitle">
        A modern WordPress build tool for plugins and themes.
        Handles PHP templates, assets, and build pipelines with a unified system.
      </div>

      <div class="admin-links">
        <a href="https://github.com/EMILO9/wp-builder" target="_blank" rel="noreferrer">
          GitHub Repository
        </a>

        <a href="https://www.npmjs.com/package/@emilo/wp-builder" target="_blank" rel="noreferrer">
          NPM Package
        </a>
      </div>

      <div class="admin-footer">
        Built for modern WordPress development workflows.
      </div>
    </div>
  `);
});
