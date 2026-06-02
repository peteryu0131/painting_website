import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("design system locks the old-money color direction", async () => {
  const design = await readFile(new URL("../DESIGN.md", import.meta.url), "utf8");
  const tailwind = await readFile(
    new URL("../tailwind.config.ts", import.meta.url),
    "utf8",
  );

  ["#171A12", "#202516", "#2A2D1F", "#C4A15A", "#EFE7D6"].forEach(
    (token) => {
      assert.match(`${design}\n${tailwind}`, new RegExp(token, "i"));
    },
  );
});

test("homepage uses warm ivory sections to avoid a flat all-dark poster", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

  assert.match(page, /bg-cream/);
  assert.match(page, /text-oliveMain/);
});
