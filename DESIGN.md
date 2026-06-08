# Design System

## Brand Position

This website is a premium but practical company website for Maison Murale.

Maison Murale is a high-end interior and exterior painting company in Victoria, BC. The site should position the company around professional preparation, premium low-VOC materials, clean project delivery, and a 3D visual preview that helps clients see color and finish direction before painting begins.

The first-screen experience must make this clear within five seconds:

> Maison Murale provides high-end interior and exterior painting, with free quotes and 3D visual previews for confident color decisions.

## Tone

- Premium, calm, clean, and service-focused.
- Serious enough for luxury homes, condos, restaurants, hotels, offices, salons, and high-end property owners.
- Practical enough for regular residential and commercial painting projects.
- Not a mural studio, renovation company, technology company, academy, or animation showcase.
- Copy should be direct and specific. Avoid abstract luxury language that hides the actual painting services.

## Visual Direction

- Background: olive old-money artisan studio, not pure black luxury.
- Accents: antique champagne gold, restrained and never bright yellow.
- Text: warm cream on olive sections.
- Texture: subtle paper, plaster, or material texture only; no heavy decoration.
- Imagery: large interior painting and finished-space photos. Portfolio images should be real company work.
- Headings: serif font stack for a high-end company feel.
- Body text: clean sans-serif font stack for readability.
- Layout: generous spacing, clear section rhythm, large readable blocks.
- Cards: soft dark surfaces, subtle borders, restrained shadow, smooth hover states.

## Color Tokens

- Main background: `#061612`
- Deep background: `#03100d`
- Card background: `#0a211b`
- Cream: `#f3ead8`
- Antique gold: `#c7a15a`
- Soft gold: `#e0c383`
- Main text: `#f5efe2`
- Muted text: `#c8bda5`
- Border: `rgba(199, 161, 90, 0.45)`

## Typography

- Headings use a serif stack: `Cormorant Garamond, Georgia, Cambria, serif`.
- Labels and navigation use `Cinzel, Georgia, serif`.
- Body text uses a clean sans-serif stack: `Inter, Segoe UI, Arial, sans-serif`.
- Hero headings should be large but not theatrical.
- Section headings should be strong and readable.
- Buttons and labels should be concise.

## Motion Rules

Use GSAP only for subtle premium motion:

- Hero fade-in
- Image parallax
- Service cards scroll reveal
- Process timeline reveal
- Portfolio section reveal
- CTA section fade-in

Do not use:

- Particles
- Fast bouncing animations
- Neon cyber effects
- Constant movement
- Random animated components that do not support the company brand

## Static Implementation Rules

Use a simple static structure:

- `index.html`
- `style.css`
- `script.js`
- `assets/`

Use small selected CSS effects only when they support the old-money artisan painting brand. Do not add component frameworks or build tooling.

## Page Structure

1. Header and navigation
2. Hero
3. Value strip
4. Painting process
5. Services
6. Color and finish planning
7. Portfolio
8. Contact / free quote form
9. Footer

Do not include a training page, training navigation item, mural page, or academy language in the first version.

## Painting Process

This section is a core differentiator and must stay near the top of the homepage.

- It explains the service model: consultation, site review, quote, optional 3D visual preview, preparation, painting, cleanup, final check, and touch-ups when related to workmanship.
- Exterior preparation can include pressure washing, drying time, sanding, scraping failed paint, priming raw wood or exposed areas, masking, spraying, back rolling when needed, and detail brush or roller work.
- Interior preparation can include floor and furniture protection, drywall repair, caulking, sanding, masking, painting, cleanup, final check, and touch-ups.
- Avoid laser-specific scan wording.
- Do not imply full renovation, structural repair, licensing, insurance, certification, murals, or training unless those claims are confirmed later.

## UX Requirements

- Primary action: `Request a Free Quote`
- Secondary action: `View Our Work`
- The site must not ask users to upload images in the first version.
- The contact form should stay simple:
  - First name
  - Last name
  - Email
  - Phone number
  - Message or project description
- Use on-site service language:
  - Site Review
  - Site Visit
  - Photos and Measurements
  - 3D Visual Preview
  - Preparation
  - Final Check
- Contact details can remain placeholders until the exact phone, website, social media, and WeChat details are confirmed. The company email is `maisonmurale@outlook.com`.

## Responsive Rules

- Desktop: strong two-column hero, service card grid, spacious process timeline.
- Tablet: preserve visual hierarchy with two-column cards where possible.
- Mobile: stack sections cleanly, keep buttons tappable, avoid cramped text, and make the quote path obvious.
