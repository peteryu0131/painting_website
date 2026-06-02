import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const sourceFiles = [
  "../app/page.tsx",
  "../lib/siteContent.ts",
  "../components/TrainingTabs.tsx",
];

async function readSiteSource() {
  const chunks = await Promise.all(
    sourceFiles.map(async (file) => {
      try {
        return await readFile(new URL(file, import.meta.url), "utf8");
      } catch (error) {
        if (error.code === "ENOENT") {
          return "";
        }

        throw error;
      }
    }),
  );

  return chunks.join("\n");
}

test("homepage clearly presents the three business lines and booking path", async () => {
  const source = await readSiteSource();

  [
    "Painting, Renovation, and Training for Better Spaces",
    "We provide premium wall painting, renovation, and hands-on painter training, supported by space scanning, 3D planning, and finish visualization.",
    "Professional Painting",
    "Renovation & Wall Restoration",
    "Painter Training Academy",
    "Book a Site Visit",
    "Explore Our Process",
  ].forEach((copy) => {
    assert.match(source, new RegExp(copy.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  });
});

test("homepage includes required service, process, portfolio, training, and contact sections", async () => {
  const source = await readSiteSource();

  [
    "Our Signature Process",
    "A Smarter, More Refined Way to Transform Your Walls.",
    "Space Scanning",
    "3D Space Modeling",
    "Finish & Color Visualization",
    "Quote + Flawless Execution",
    "Train to Become a Professional Painter",
    "Selected Work Examples",
    "Why Choose Us",
    "Book a Site Visit or Ask About Training",
  ].forEach((copy) => {
    assert.match(source, new RegExp(copy.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  });
});

test("homepage puts business entry points before the signature process", async () => {
  const source = await readSiteSource();
  const businessIndex = source.indexOf("Three business lines");
  const processIndex = source.indexOf("Our Signature Process");

  assert.notEqual(businessIndex, -1);
  assert.notEqual(processIndex, -1);
  assert.ok(businessIndex < processIndex);
});

test("homepage avoids laser-scan wording and image-upload flows", async () => {
  const source = await readSiteSource();

  assert.doesNotMatch(source, /Laser Scan/i);
  assert.doesNotMatch(source, /Laser Scanning/i);
  assert.doesNotMatch(source, /upload image/i);
  assert.doesNotMatch(source, /image upload/i);
});
