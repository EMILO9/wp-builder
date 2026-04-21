import "@/style.css";
import $ from "jquery";
import myImage from "@/assets/122.webp?no-inline";

$(() => {
	const $root = $("#root");
	if (!$root.length) {
		console.warn("Test-A: #root element not found.");
		return;
	}

	$root.html(`
    <div class="test-a-container">
      <img src="${myImage}" alt="Test Asset" style="max-width: 100%; height: auto;" />

      <h2>Build Test: "test-a"</h2>
      <p>Status: <span class="test-a-status">Build Successful!</span></p>
      <hr />
      <button id="test-a-trigger" class="button button-primary">
        Click to Test jQuery
      </button>
    </div>
  `);

	$("#test-a-trigger").on("click", (e) => {
		$(e.currentTarget).text("Working! ✅");
		console.log("Test-A: jQuery event listener fired successfully.");
	});
});
