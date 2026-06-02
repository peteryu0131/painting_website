import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import { constants } from "node:fs";
import test from "node:test";

async function fileExists(path) {
  try {
    await access(new URL(`../${path}`, import.meta.url), constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function readProjectFile(path) {
  return readFile(new URL(`../${path}`, import.meta.url), "utf8");
}

function escapedPattern(copy) {
  return new RegExp(copy.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
}

test("static website root files exist", async () => {
  await Promise.all(
    ["index.html", "style.css", "script.js", "assets"].map(async (path) => {
      assert.equal(await fileExists(path), true, `${path} should exist`);
    }),
  );
});

test("homepage presents the required business, process, and booking content", async () => {
  const html = await readProjectFile("index.html");

  [
    "Premium Painting &middot; Renovation &middot; 3D Finish Preview",
    "Refined Walls, Planned Before We Paint",
    "We provide premium wall painting, renovation, and hands-on painter training, supported by space scanning, 3D modeling, and finish visualization before work begins.",
    "Professional Painting",
    "Renovation & Wall Restoration",
    "Painter Training Academy",
    "Our Signature Process",
    "A Smarter, More Refined Way to Transform Your Walls.",
    "Space Scanning",
    "3D Space Modeling",
    "Finish & Color Visualization",
    "Quote + Flawless Execution",
    "Train to Become a Professional Painter",
    "Book a Site Visit or Ask About Training",
  ].forEach((copy) => {
    assert.match(html, escapedPattern(copy));
  });
});

test("static site avoids banned frameworks and banned wording", async () => {
  const html = await readProjectFile("index.html");
  const css = await readProjectFile("style.css");
  const js = await readProjectFile("script.js");
  const pkg = await readProjectFile("package.json");
  const all = `${html}\n${css}\n${js}\n${pkg}`;

  assert.doesNotMatch(all, /React|Next\.js|next dev|tailwind|vite/i);
  assert.doesNotMatch(all, /Laser Scanning|Laser Scan/i);
  assert.doesNotMatch(all, /upload image|image upload/i);
  assert.match(html, /gsap/i);
});

test("site source avoids mojibake and uses selected premium UI hooks", async () => {
  const html = await readProjectFile("index.html");
  const css = await readProjectFile("style.css");
  const js = await readProjectFile("script.js");
  const all = `${html}\n${css}\n${js}`;

  assert.doesNotMatch(all, /Â|â†|â€¢|�/);
  assert.match(all, /uiverse-button/);
  assert.match(all, /uiverse-card/);
  assert.match(js, /ScrollTrigger\.batch/);
  assert.match(js, /data-animate/);
});

test("navigation home anchor targets hero and premium button effects cannot cover nav", async () => {
  const html = await readProjectFile("index.html");
  const css = await readProjectFile("style.css");

  assert.doesNotMatch(html, /<header[^>]*id="home"/);
  assert.match(html, /<section class="hero section-dark" id="home"/);
  assert.match(css, /\.uiverse-button\s*\{[^}]*position:\s*relative;/s);
  assert.match(css, /\.uiverse-button\s*\{[^}]*overflow:\s*hidden;/s);
  assert.match(css, /\.uiverse-button::before\s*\{[^}]*pointer-events:\s*none;/s);
  assert.match(css, /\[id\]\s*\{[^}]*scroll-margin-top:\s*88px;/s);
});

test("design palette is locked in CSS variables", async () => {
  const css = await readProjectFile("style.css");

  [
    "--bg-main: #171A12;",
    "--bg-section: #202516;",
    "--bg-card: #2A2D1F;",
    "--cream: #EFE7D6;",
    "--cream-soft: #D8CDB8;",
    "--gold: #C4A15A;",
    "--gold-soft: #A98A4C;",
    "--text-main: #F4ECDD;",
    "--text-muted: #B9AE9A;",
    "--border: rgba(196, 161, 90, 0.28);",
  ].forEach((token) => assert.match(css, escapedPattern(token)));
});

test("assets include the replaceable hero image", async () => {
  const image = await stat(new URL("../assets/hero-olive-interior.png", import.meta.url));
  assert.equal(image.isFile(), true);
  assert.ok(image.size > 1000, "hero image should not be empty");
});
