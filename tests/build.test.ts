import { describe, it, expect } from "vitest";
import { execa } from "execa";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "fs-extra";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FIXTURES_DIR = path.resolve(__dirname, "fixtures");
const fixtures = (await fs.readdir(FIXTURES_DIR, { withFileTypes: true }))
  .filter((fixture) => fixture.isDirectory())
  .map((fixture) => fixture.name);

describe("CLI Build Integration", () => {
  for (const fixture of fixtures) {
    const fixtureDir = path.join(FIXTURES_DIR, fixture);
    it(`builds project for ${fixture}`, async () => {
      await execa("npm", ["install"], {
        cwd: fixtureDir,
        stdio: "inherit",
      });
      const result = await execa("npx", ["wp-builder", "build"], {
        cwd: fixtureDir,
        reject: false,
        stdio: "inherit",
      });
      expect(result.exitCode).toBe(0);
    });
  }
});
