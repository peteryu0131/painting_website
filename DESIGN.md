# Design System

## Brand Position

This website is a premium but practical company website for three main business lines:

1. Professional painting
2. Renovation and wall restoration
3. Painter training academy

The first-screen experience must make this clear within five seconds:

> This company provides painting, renovation, and painter training. I can book a site visit or ask about training.

## Tone

- Premium, calm, clean, and service-focused.
- Practical enough for homeowners, businesses, and future painters.
- Not a poster, game, cyberpunk page, or animation showcase.
- Copy should be direct and specific. Avoid abstract luxury language that hides the actual services.

## Visual Direction

- Background: olive old-money artisan studio, not pure black luxury.
- Accents: antique champagne gold, restrained and never bright yellow.
- Text: warm cream on olive sections and deep olive text on cream sections.
- Light sections: warm cream bands to make the site feel like a real wall, material, renovation, and training company.
- Texture: subtle paper, plaster, or material texture only; no heavy decoration.
- Imagery: large interior painting, renovation, and training photos.
- Headings: serif font stack for a high-end company feel.
- Body text: clean sans-serif font stack for readability.
- Layout: generous spacing, clear section rhythm, large readable blocks.
- Cards: soft dark surfaces, subtle borders, restrained shadow, smooth hover states.

## Color Tokens

- Main background: `#171A12`
- Section background: `#202516`
- Card background: `#2A2D1F`
- Cream: `#EFE7D6`
- Cream soft: `#D8CDB8`
- Antique gold: `#C4A15A`
- Soft gold: `#A98A4C`
- Main text: `#F4ECDD`
- Muted text: `#B9AE9A`
- Border: `rgba(196, 161, 90, 0.28)`

## Typography

- Headings use a serif stack: `Georgia, Cambria, Times New Roman, serif`.
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
- Portfolio image reveal
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

Use small selected CSS effects only when they support the old-money artisan studio brand. Do not add component frameworks or build tooling.

## Page Structure

1. Header and navigation
2. Hero
3. Three business lines
4. Our Signature Process
5. Portfolio
6. Training Academy
7. Why Choose Us
8. Contact / booking form
9. Footer

## Signature Process

This section is a core differentiator and must stay near the top of the homepage, after the three business entry cards.

- It explains the premium service model: scan and measure the space, build a 3D model, preview colors and finishes, then quote and execute.
- Use `Space Scanning` or `Room Scan & Measurement`.
- Avoid naming the scan as laser-based.
- Keep the line: `A Smarter, More Refined Way to Transform Your Walls.`
- The layout should feel like a refined brand process, not a generic service checklist.
- Use one project placeholder image only until real company photography is ready.
- Process visuals should be replaceable material/texture placeholders, not generated interior image sets.

## UX Requirements

- Primary action: `Book a Site Visit`
- Secondary action: `Explore Our Process`
- Training must feel like a major business line, not a small footer link.
- The site must not ask users to upload images.
- Use on-site service language:
  - Site Visit
  - Room Scan & Measurement
  - On-Site Assessment
  - Space Review
- Avoid laser-specific scan wording.

## Responsive Rules

- Desktop: strong two-column hero, three service cards, spacious process timeline.
- Tablet: preserve visual hierarchy with two-column cards where possible.
- Mobile: stack sections cleanly, keep buttons tappable, avoid cramped text, and make the booking path obvious.
