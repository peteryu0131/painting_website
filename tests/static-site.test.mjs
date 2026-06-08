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
    ["index.html", "style.css", "script.js", "assets", "assets/logo-crest.png"].map(async (path) => {
      assert.equal(await fileExists(path), true, `${path} should exist`);
    }),
  );
  assert.equal(await fileExists("training.html"), false, "training.html should not be part of the first version");
});

test("homepage presents the required painting, preview, and quote content", async () => {
  const html = await readProjectFile("index.html");

  [
    "Maison Murale",
    "Interior &amp; Exterior Painting",
    "Victoria, BC + Vancouver Island",
    "High-End Interior &amp; Exterior",
    "Painting and Finishes",
    "3D visual preview",
    "Request a Free Quote",
    "Interior &amp; Exterior Work",
    "Proper Preparation",
    "Premium Materials",
    "Our Painting Process",
    "From site review to final touch-up",
    "Consultation &amp; Review",
    "Quote &amp; Visual Preview",
    "Preparation &amp; Protection",
    "Painting &amp; Final Check",
    "Professional Painting Services",
    "Interior Painting",
    "Exterior Painting",
    "Feature Walls &amp; Trim",
    "Wall Repair &amp; Preparation",
    "Commercial Painting",
    "3D Visual Preview",
    "Color &amp; Finish Planning",
    "Our Work",
    "Real project photos",
    "maisonmurale@outlook.com",
    "Victoria, BC and nearby Vancouver Island communities",
    "First Name",
    "Last Name",
  ].forEach((copy) => {
    assert.match(html, escapedPattern(copy));
  });

  assert.match(html, /name="firstName" autocomplete="given-name" required/);
  assert.match(html, /name="lastName" autocomplete="family-name" required/);
  assert.doesNotMatch(html, /Full Name/);
  assert.doesNotMatch(html, /name="name" autocomplete="name"/);
});

test("static site avoids banned frameworks and unconfirmed service wording", async () => {
  const html = await readProjectFile("index.html");
  const css = await readProjectFile("style.css");
  const js = await readProjectFile("script.js");
  const pkg = await readProjectFile("package.json");
  const all = `${html}\n${css}\n${js}\n${pkg}`;

  assert.doesNotMatch(all, /React|Next\.js|next dev|tailwind|vite/i);
  assert.doesNotMatch(all, /Laser Scanning|Laser Scan|laser/i);
  assert.doesNotMatch(html, /Space Scanning|space scanning|Room Scan/i);
  assert.doesNotMatch(all, /upload image|image upload/i);
  assert.doesNotMatch(html, /training\.html|Training Academy|Professional Painter Training|Apply for Training/i);
  assert.doesNotMatch(html, /Murals &amp; Artistic Commissions|Mural commission|Heritage &amp; Restoration|Heritage restoration/i);
  assert.doesNotMatch(html, /Licensed|Insured|Certified|Full renovation|Structural repair/i);
  assert.match(html, /gsap/i);
});

test("site source avoids mojibake and uses selected premium UI hooks", async () => {
  const html = await readProjectFile("index.html");
  const css = await readProjectFile("style.css");
  const js = await readProjectFile("script.js");
  const all = `${html}\n${css}\n${js}`;

  assert.doesNotMatch(all, /Ã‚|Ã¢â€ |Ã¢â‚¬Â¢|ï¿½/);
  assert.match(all, /uiverse-button/);
  assert.match(all, /uiverse-card/);
  assert.match(js, /ScrollTrigger\.batch/);
  assert.match(js, /data-animate/);
});

test("navigation home anchor targets hero and no training link remains", async () => {
  const html = await readProjectFile("index.html");
  const css = await readProjectFile("style.css");

  assert.doesNotMatch(html, /<header[^>]*id="home"/);
  assert.match(html, /<section class="hero section-dark[^"]*" id="home"/);
  assert.doesNotMatch(html, /href="training\.html"/);
  assert.match(css, /\.uiverse-button\s*\{[^}]*position:\s*relative;/s);
  assert.match(css, /\.uiverse-button\s*\{[^}]*overflow:\s*hidden;/s);
  assert.match(css, /\.uiverse-button::before\s*\{[^}]*pointer-events:\s*none;/s);
  assert.match(css, /\[id\]\s*\{[^}]*scroll-margin-top:\s*88px;/s);
});

test("site uses the transparent crest logo asset", async () => {
  const html = await readProjectFile("index.html");
  const css = await readProjectFile("style.css");
  const logo = await stat(new URL("../assets/logo-crest.png", import.meta.url));

  assert.equal(logo.isFile(), true);
  assert.ok(logo.size > 1000, "logo crest asset should not be empty");
  assert.match(html, /<img src="assets\/logo-crest\.png" width="746" height="991" alt="" \/>/);
  assert.doesNotMatch(html, /src="logo\.png"/);
  assert.doesNotMatch(html, /brand-crown|brand-initial/);
  assert.match(css, /\.brand-mark\s*\{[^}]*width:\s*38px;[^}]*height:\s*38px;[^}]*overflow:\s*hidden;[^}]*transform:\s*translateY\(-4px\);/s);
  assert.match(css, /\.brand-mark img\s*\{[^}]*object-fit:\s*contain;/s);
});

test("site adds subtle interaction and quote flow helpers", async () => {
  const html = await readProjectFile("index.html");
  const css = await readProjectFile("style.css");
  const js = await readProjectFile("script.js");

  assert.match(html, /class="scroll-progress" data-scroll-progress/);
  assert.match(css, /\.scroll-progress\s*\{[^}]*position:\s*fixed;[^}]*transform:\s*scaleX\(0\);/s);
  assert.match(css, /\.site-nav a\.is-active/s);
  assert.match(html, /data-project-type="Interior painting"/);
  assert.match(html, /data-project-type="Exterior painting"/);
  assert.match(html, /data-project-type="Commercial painting"/);
  assert.match(html, /data-project-type="3D visual preview"/);
  assert.doesNotMatch(html, /Project Type/);
  assert.doesNotMatch(html, /<select name="interest"/);
  assert.match(js, /updateScrollExperience/);
  assert.match(js, /\.sort\(\(a,\s*b\)\s*=>\s*a\.section\.offsetTop\s*-\s*b\.section\.offsetTop\)/);
  assert.match(js, /aria-current/);
  assert.match(js, /startProjectInquiry/);
  assert.doesNotMatch(js, /select\[name='interest'\]/);
});

test("quiet luxury polish improves guidance, imagery, and motion", async () => {
  const html = await readProjectFile("index.html");
  const css = await readProjectFile("style.css");
  const js = await readProjectFile("script.js");

  assert.match(html, /class="floating-consultation uiverse-button"/);
  assert.match(html, /data-floating-consultation/);
  assert.doesNotMatch(html, /data-selection-note/);
  assert.match(html, /class="portfolio-placeholder luxury-panel uiverse-card/);
  assert.match(css, /\.floating-consultation\s*\{[^}]*position:\s*fixed;[^}]*opacity:\s*0;/s);
  assert.match(css, /\.floating-consultation\.is-visible\s*\{[^}]*opacity:\s*1;/s);
  assert.doesNotMatch(css, /\.selection-note/);
  assert.match(css, /\.image-frame::before\s*\{[^}]*box-shadow:\s*inset 0 0 0 1px rgba\(224,\s*195,\s*131,\s*0\.16\)/s);
  assert.match(css, /\.portfolio-placeholder\s*\{[^}]*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\);/s);
  assert.match(css, /\.service-card\[data-project-type\]::after\s*\{[^}]*content:\s*"Request quote";/s);
  assert.match(js, /floatingConsultation/);
  assert.doesNotMatch(js, /selectionNote/);
  assert.doesNotMatch(js, /updateSelectedProjectNote/);
  assert.match(js, /data-animate='section-copy'/);
});

test("hero uses vertical gallery composition and engraved wall texture", async () => {
  const html = await readProjectFile("index.html");
  const css = await readProjectFile("style.css");

  assert.doesNotMatch(html, /page-side-ornament/);
  assert.doesNotMatch(css, /page-side-ornament/);
  assert.match(css, /\.hero-grid\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*0\.92fr\)\s+minmax\(360px,\s*0\.78fr\);/s);
  assert.match(css, /\.hero-visual\s*\{[^}]*max-width:\s*560px;/s);
  assert.match(css, /\.hero-image-wrap\s*\{[^}]*aspect-ratio:\s*4\s*\/\s*5;/s);
  assert.match(css, /\.hero-image-wrap img\s*\{[^}]*object-position:\s*center center;/s);
  assert.match(css, /body::after\s*\{[^}]*engraved-wall-texture/s);
  assert.match(css, /body::after\s*\{[^}]*opacity:\s*0\.15;/s);
  assert.match(css, /\.luxury-texture::after\s*\{[^}]*linear-gradient\(135deg,\s*transparent 0 48%/s);
  assert.match(css, /\.section-dark-alt\s*\{[^}]*border-top:\s*1px solid rgba\(199,\s*161,\s*90,\s*0\.22\);[^}]*border-bottom:\s*0;/s);
  assert.doesNotMatch(css, /data:image\/svg\+xml/);
  assert.doesNotMatch(css, /\.hero::after\s*\{[^}]*ornamental-linework/s);
});

test("card grids keep process, service, and portfolio panels visually even", async () => {
  const css = await readProjectFile("style.css");
  const js = await readProjectFile("script.js");

  assert.match(css, /\.process-step\s*\{[^}]*display:\s*flex;[^}]*flex-direction:\s*column;[^}]*min-height:\s*390px;/s);
  assert.match(css, /\.process-visual\s*\{[^}]*height:\s*148px;/s);
  assert.match(css, /\.service-grid\s*\{[^}]*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\);[^}]*grid-auto-rows:\s*minmax\(318px,\s*auto\);/s);
  assert.match(css, /\.service-card\s*\{[^}]*display:\s*flex;[^}]*flex-direction:\s*column;[^}]*min-height:\s*318px;/s);
  assert.match(css, /\.portfolio-placeholder article\s*\{[^}]*min-height:\s*250px;/s);
  assert.match(js, /y:\s*options\.y\s*\?\?\s*28,/);
  assert.match(js, /batchReveal\("\[data-animate='card'\]", \{ y: 0, batchMax: 3 \}\);/);
  assert.match(js, /batchReveal\("\[data-animate='process'\]", \{ y: 0, batchMax: 4 \}\);/);
  assert.match(js, /batchReveal\("\[data-animate='portfolio'\]", \{ y: 0, batchMax: 3 \}\);/);
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
