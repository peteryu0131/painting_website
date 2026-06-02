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
    ["index.html", "training.html", "style.css", "script.js", "assets"].map(async (path) => {
      assert.equal(await fileExists(path), true, `${path} should exist`);
    }),
  );
});

test("homepage presents the required business, process, and booking content", async () => {
  const html = await readProjectFile("index.html");

  [
    "Maison Murale",
    "Luxury Wall Painting",
    "Walls That Define",
    "Extraordinary<br />Spaces",
    "Bespoke wall painting crafted with artistry",
    "Designed around your space before the first brushstroke.",
    "Bespoke Customization",
    "Premium Materials",
    "3D Preview",
    "Concierge Management",
    "Our Signature Process",
    "Technology Meets Artistry",
    "Room Capture",
    "3D Room Modeling",
    "Realistic Finish Preview",
    "Final Painting &amp; Delivery",
    "Bespoke Wall Painting",
    "Decorative Finishes",
    "Murals &amp; Artistic Commissions",
    "Heritage &amp; Restoration",
    "Commercial &amp; Hospitality Projects",
    "Training Academy",
    "Professional Painter Training",
    "Explore Training",
    "Finish Collection",
    "Curated Works",
    "Start Your Bespoke Project",
  ].forEach((copy) => {
    assert.match(html, escapedPattern(copy));
  });
});

test("static site avoids banned frameworks and banned wording", async () => {
  const html = await readProjectFile("index.html");
  const training = await readProjectFile("training.html");
  const css = await readProjectFile("style.css");
  const js = await readProjectFile("script.js");
  const pkg = await readProjectFile("package.json");
  const all = `${html}\n${training}\n${css}\n${js}\n${pkg}`;

  assert.doesNotMatch(all, /React|Next\.js|next dev|tailwind|vite/i);
  assert.doesNotMatch(all, /Laser Scanning|Laser Scan|laser/i);
  assert.doesNotMatch(html, /Space Scanning|space scanning|Room Scan/i);
  assert.doesNotMatch(all, /upload image|image upload/i);
  assert.match(html, /gsap/i);
});

test("site source avoids mojibake and uses selected premium UI hooks", async () => {
  const html = await readProjectFile("index.html");
  const training = await readProjectFile("training.html");
  const css = await readProjectFile("style.css");
  const js = await readProjectFile("script.js");
  const all = `${html}\n${training}\n${css}\n${js}`;

  assert.doesNotMatch(all, /Â|â†|â€¢|�/);
  assert.match(all, /uiverse-button/);
  assert.match(all, /uiverse-card/);
  assert.match(js, /ScrollTrigger\.batch/);
  assert.match(js, /data-animate/);
});

test("navigation home anchor targets hero and premium button effects cannot cover nav", async () => {
  const html = await readProjectFile("index.html");
  const training = await readProjectFile("training.html");
  const css = await readProjectFile("style.css");

  assert.doesNotMatch(html, /<header[^>]*id="home"/);
  assert.match(html, /<section class="hero section-dark[^"]*" id="home"/);
  assert.match(training, /<a href="training\.html">Training<\/a>/);
  assert.match(css, /\.uiverse-button\s*\{[^}]*position:\s*relative;/s);
  assert.match(css, /\.uiverse-button\s*\{[^}]*overflow:\s*hidden;/s);
  assert.match(css, /\.uiverse-button::before\s*\{[^}]*pointer-events:\s*none;/s);
  assert.match(css, /\[id\]\s*\{[^}]*scroll-margin-top:\s*88px;/s);
});

test("hero uses vertical gallery composition and subtle ornamental background", async () => {
  const css = await readProjectFile("style.css");

  assert.match(css, /\.hero-grid\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*0\.92fr\)\s+minmax\(360px,\s*0\.78fr\);/s);
  assert.match(css, /\.hero-visual\s*\{[^}]*max-width:\s*560px;/s);
  assert.match(css, /\.hero-image-wrap\s*\{[^}]*aspect-ratio:\s*4\s*\/\s*5;/s);
  assert.match(css, /\.hero-image-wrap img\s*\{[^}]*object-position:\s*center center;/s);
  assert.match(css, /\.hero::after\s*\{[^}]*ornamental-linework/s);
  assert.match(css, /\.hero::after\s*\{[^}]*mask-image:/s);
});

test("design palette is locked in CSS variables", async () => {
  const css = await readProjectFile("style.css");

  [
    "--bg-main: #061612;",
    "--bg-deep: #03100d;",
    "--bg-card: #0a211b;",
    "--bg-card-soft: rgba(8, 31, 25, 0.82);",
    "--gold: #c7a15a;",
    "--gold-light: #e0c383;",
    "--gold-dark: #8f6f32;",
    "--cream: #f3ead8;",
    "--text-main: #f5efe2;",
    "--text-muted: #c8bda5;",
    "--border-gold: rgba(199, 161, 90, 0.45);",
  ].forEach((token) => assert.match(css, escapedPattern(token)));
});

test("assets include the replaceable hero image", async () => {
  const image = await stat(new URL("../assets/hero-olive-interior.png", import.meta.url));
  assert.equal(image.isFile(), true);
  assert.ok(image.size > 1000, "hero image should not be empty");
});

test("training page presents painter academy content", async () => {
  const html = await readProjectFile("training.html");

  [
    "Maison Murale Training Academy",
    "Train to Paint Walls With Professional Control",
    "Foundation Wall Preparation",
    "Brush, Roller &amp; Tool Control",
    "Decorative Finish Practice",
    "Client Workflow &amp; Site Standards",
    "Apply for Training",
    "Back to Main Site",
  ].forEach((copy) => {
    assert.match(html, escapedPattern(copy));
  });
});
