import { describe, it, expect } from "vitest";
import { execa } from "execa";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "fs-extra";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FIXTURES_DIR = path.resolve(__dirname, "fixtures");

describe("CLI Build Integration", async () => {
  const fixtures = (await fs.readdir(FIXTURES_DIR, { withFileTypes: true }))
    .filter((f) => f.isDirectory())
    .map((f) => f.name);
  for (const fixture of fixtures) {
    it(`should build fixture: ${fixture}`, async () => {
      const fixtureDir = path.join(FIXTURES_DIR, fixture);
      const result = await execa("npx", ["js2wp", "build"], {
        cwd: fixtureDir,
        reject: false,
        timeout: 15000,
        env: { ...process.env, FORCE_COLOR: "3" },
      });
      if (result.exitCode !== 0) {
        console.error(result.stderr || result.stdout);
      }
      expect(result.exitCode).toBe(0);
    });
  }
});
