import { HoverCard } from "@/components/HoverCard";
import { ImageReveal } from "@/components/ImageReveal";
import { PremiumButton, premiumButtonClass } from "@/components/PremiumButton";
import { ScrollAnimations } from "@/components/ScrollAnimations";
import { TrainingTabs } from "@/components/TrainingTabs";
import {
  heroBadges,
  navItems,
  portfolioProjects,
  services,
  signatureProcessSteps,
  supportingServices,
  trainingPrograms,
  whyChooseUs,
} from "@/lib/siteContent";

function SectionIntro({
  eyebrow,
  title,
  text,
  tone = "dark",
}: {
  eyebrow: string;
  title: string;
  text: string;
  tone?: "dark" | "light";
}) {
  const colors =
    tone === "light"
      ? {
          eyebrow: "text-goldSoft",
          title: "text-oliveMain",
          text: "text-oliveMain/72",
        }
      : {
          eyebrow: "text-gold",
          title: "text-textMain",
          text: "text-textMuted",
        };

  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className={`text-sm font-semibold ${colors.eyebrow}`}>{eyebrow}</p>
      <h2 className={`mt-4 font-serifDisplay text-4xl md:text-5xl ${colors.title}`}>
        {title}
      </h2>
      <p className={`mt-5 text-lg leading-8 ${colors.text}`}>{text}</p>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <ScrollAnimations />
      <header className="sticky top-0 z-50 border-b border-gold/25 bg-oliveMain/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#home" className="font-serifDisplay text-xl text-textMain">
            Northline Finish Co.
          </a>
          <div className="hidden items-center gap-7 text-sm text-textMuted lg:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="transition duration-300 hover:text-gold"
              >
                {item.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="rounded-full border border-gold bg-transparent px-5 py-2.5 text-sm font-semibold text-gold transition duration-300 hover:bg-gold hover:text-oliveMain"
          >
            Book a Site Visit
          </a>
        </nav>
      </header>

      <main id="home">
        <section className="relative overflow-hidden border-b border-gold/20">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-28">
            <div className="flex flex-col justify-center">
              <p data-hero-reveal className="text-sm font-semibold text-gold">
                Olive old-money artisan studio
              </p>
              <h1
                data-hero-reveal
                className="mt-5 max-w-4xl font-serifDisplay text-5xl leading-tight text-textMain md:text-7xl"
              >
                Painting, Renovation, and Training for Better Spaces
              </h1>
              <p
                data-hero-reveal
                className="mt-6 max-w-2xl text-lg leading-8 text-textMuted md:text-xl"
              >
                We provide premium wall painting, renovation, and hands-on
                painter training, supported by space scanning, 3D planning, and
                finish visualization.
              </p>
              <div data-hero-reveal className="mt-9 flex flex-col gap-3 sm:flex-row">
                <PremiumButton href="#contact">Book a Site Visit</PremiumButton>
                <PremiumButton href="#process" variant="secondary">
                  Explore Our Process
                </PremiumButton>
              </div>
              <div
                data-hero-reveal
                className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-2"
              >
                {["On-site service", "Clear planning", "Professional finish", "Hands-on training"].map(
                  (item) => (
                    <div
                      key={item}
                      className="rounded-[8px] border border-gold/25 bg-oliveSection/70 px-4 py-3 text-sm text-textMain"
                    >
                      {item}
                    </div>
                  ),
                )}
              </div>
            </div>

            <div data-hero-reveal className="relative">
              <ImageReveal
                src="/images/hero-olive-interior.png"
                alt="Refined interior wall finish in an olive old-money space"
                priority
                parallax
                className="aspect-[4/5] min-h-[520px] lg:aspect-[5/6]"
              />
              <div className="absolute -bottom-5 left-4 right-4 grid gap-3 sm:grid-cols-2">
                {heroBadges.map((badge) => (
                  <div
                    key={badge}
                    className="rounded-[8px] border border-gold/35 bg-oliveMain/88 px-4 py-3 text-sm font-semibold text-textMain shadow-premium backdrop-blur"
                  >
                    {badge}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="business-lines"
          className="bg-cream px-5 py-20 text-oliveMain lg:px-8 lg:py-28"
        >
          <div className="mx-auto max-w-7xl">
            <SectionIntro
              eyebrow="Three business lines"
              title="Painting, restoration, and training under one standard"
              text="Choose the service path that fits your space, project stage, or career goal."
              tone="light"
            />
            <div className="mt-14 grid gap-5 lg:grid-cols-3">
              {services.map((service) => (
                <HoverCard
                  key={service.title}
                  label={service.label}
                  title={service.title}
                  description={service.description}
                  items={service.items}
                  tone="light"
                  className="min-h-full"
                >
                  <a
                    href={service.id === "training" ? "#training" : "#process"}
                    className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-goldSoft transition duration-300 hover:text-oliveMain"
                  >
                    Learn More
                    <span aria-hidden="true">-&gt;</span>
                  </a>
                </HoverCard>
              ))}
            </div>
            <div className="mt-8 grid gap-3 border-t border-gold/25 pt-8 sm:grid-cols-2 lg:grid-cols-4">
              {supportingServices.map((service) => (
                <div
                  key={service}
                  className="rounded-[8px] border border-gold/20 bg-creamSoft/35 px-4 py-3 text-sm font-semibold text-oliveMain"
                >
                  {service}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="process"
          className="border-y border-gold/20 bg-oliveSection px-5 py-20 lg:px-8 lg:py-28"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:items-start">
              <div data-process-reveal>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                  Our Signature Process
                </p>
                <div className="mt-5 h-px w-20 bg-gold/70" />
                <h2 className="mt-7 font-serifDisplay text-4xl leading-tight text-textMain md:text-5xl">
                  A Smarter, More Refined Way to Transform Your Walls.
                </h2>
                <p className="mt-6 leading-8 text-textMuted">
                  We combine on-site space scanning, 3D planning, realistic
                  finish visualization, and careful painting execution so clients
                  can approve the direction before work begins.
                </p>
                <a
                  href="#contact"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gold transition duration-300 hover:text-textMain"
                >
                  Book a process consultation
                  <span aria-hidden="true">-&gt;</span>
                </a>
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {signatureProcessSteps.map((step, index) => (
                  <article
                    key={step.number}
                    data-process-reveal
                    className="relative rounded-[8px] border border-gold/25 bg-oliveCard p-5 shadow-premium"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-serifDisplay text-2xl text-gold">
                        {step.number}
                      </span>
                      {index < signatureProcessSteps.length - 1 ? (
                        <span className="hidden text-2xl text-gold/65 xl:block">
                          -&gt;
                        </span>
                      ) : null}
                    </div>
                    <div
                      aria-hidden="true"
                      className="mt-6 aspect-[16/10] rounded-[8px] border border-gold/20 bg-[radial-gradient(circle_at_20%_20%,rgba(239,231,214,0.18),transparent_32%),linear-gradient(135deg,rgba(196,161,90,0.22),rgba(42,45,31,0.95)_52%,rgba(23,26,18,0.96))]"
                    />
                    <h3 className="mt-5 font-serifDisplay text-xl text-textMain">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-textMuted">
                      {step.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="portfolio" className="bg-oliveMain px-5 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionIntro
              eyebrow="Portfolio"
              title="Selected Work Examples"
              text="Project cards are structured for residential painting, commercial painting, renovation, decorative finishes, and training workshop work."
            />
            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
              {portfolioProjects.map((project) => (
                <article
                  key={project.type}
                  data-portfolio-reveal
                  className="overflow-hidden rounded-[8px] border border-gold/25 bg-oliveCard shadow-premium transition duration-300 hover:-translate-y-1 hover:border-gold/50"
                >
                  <div className="relative aspect-[4/3] border-b border-gold/20 bg-[linear-gradient(135deg,rgba(196,161,90,0.28),rgba(42,45,31,0.96)_46%,rgba(23,26,18,0.98))]">
                    <div className="absolute inset-x-4 bottom-4 rounded-[8px] border border-gold/25 bg-oliveMain/75 px-3 py-2 text-sm font-semibold text-textMain backdrop-blur">
                      {project.type}
                    </div>
                  </div>
                  <div className="space-y-3 p-5 text-sm">
                    <div className="flex justify-between gap-4 text-textMuted">
                      <span>Location</span>
                      <span className="text-right text-textMain">{project.location}</span>
                    </div>
                    <div className="flex justify-between gap-4 text-textMuted">
                      <span>Service</span>
                      <span className="text-right text-textMain">{project.service}</span>
                    </div>
                    <div className="flex justify-between gap-4 text-textMuted">
                      <span>Timeline</span>
                      <span className="text-right text-textMain">{project.timeline}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="training"
          className="border-y border-gold/25 bg-cream px-5 py-20 text-oliveMain lg:px-8 lg:py-28"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <p className="text-sm font-semibold text-goldSoft">
                  Training Academy
                </p>
                <h2 className="mt-4 font-serifDisplay text-4xl text-oliveMain md:text-5xl">
                  Train to Become a Professional Painter
                </h2>
                <p className="mt-5 text-lg leading-8 text-oliveMain/72">
                  Our training program teaches practical painting skills, wall
                  preparation, tool use, material knowledge, safety, and real
                  project workflow.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <PremiumButton href="#training-programs">
                    View Training Programs
                  </PremiumButton>
                  <PremiumButton
                    href="#contact"
                    variant="secondary"
                    className="!border-gold/45 !bg-transparent !text-oliveMain hover:!border-gold hover:!bg-creamSoft/45"
                  >
                    Apply for Training
                  </PremiumButton>
                </div>
              </div>
              <div id="training-programs" data-card-reveal>
                <TrainingTabs programs={trainingPrograms} />
              </div>
            </div>
          </div>
        </section>

        <section id="why-us" className="bg-creamSoft px-5 py-20 text-oliveMain lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionIntro
              eyebrow="Why Choose Us"
              title="Professional standards from planning to handover"
              text="The same standards used to train painters guide how each project is assessed, prepared, finished, and reviewed."
              tone="light"
            />
            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {whyChooseUs.map((item) => (
                <div
                  key={item}
                  data-card-reveal
                  className="rounded-[8px] border border-gold/30 bg-cream p-6 text-lg font-semibold text-oliveMain shadow-[0_18px_44px_rgba(58,50,30,0.12)] transition duration-300 hover:border-gold/50 hover:bg-textMain"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="border-t border-gold/20 bg-oliveMain px-5 py-20 lg:px-8 lg:py-28"
        >
          <div
            data-cta-reveal
            className="mx-auto grid max-w-7xl gap-10 rounded-[8px] border border-gold/25 bg-oliveCard p-6 shadow-premium md:p-10 lg:grid-cols-[0.8fr_1.2fr]"
          >
            <div>
              <p className="text-sm font-semibold text-gold">Contact</p>
              <h2 className="mt-4 font-serifDisplay text-4xl text-textMain md:text-5xl">
                Book a Site Visit or Ask About Training
              </h2>
              <p className="mt-5 leading-8 text-textMuted">
                Send the basic details and the team can follow up about painting,
                renovation, or painter training. For on-site work, the next step
                is usually a space review, measurement, and clear quote.
              </p>
            </div>

            <form className="grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm text-textMuted">
                  Full Name
                  <input
                    className="rounded-[8px] border border-gold/25 bg-oliveMain/55 px-4 py-3 text-textMain outline-none transition duration-300 focus:border-gold"
                    name="name"
                    type="text"
                  />
                </label>
                <label className="grid gap-2 text-sm text-textMuted">
                  Email
                  <input
                    className="rounded-[8px] border border-gold/25 bg-oliveMain/55 px-4 py-3 text-textMain outline-none transition duration-300 focus:border-gold"
                    name="email"
                    type="email"
                  />
                </label>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm text-textMuted">
                  Phone
                  <input
                    className="rounded-[8px] border border-gold/25 bg-oliveMain/55 px-4 py-3 text-textMain outline-none transition duration-300 focus:border-gold"
                    name="phone"
                    type="tel"
                  />
                </label>
                <label className="grid gap-2 text-sm text-textMuted">
                  Project Location
                  <input
                    className="rounded-[8px] border border-gold/25 bg-oliveMain/55 px-4 py-3 text-textMain outline-none transition duration-300 focus:border-gold"
                    name="location"
                    type="text"
                  />
                </label>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm text-textMuted">
                  I am interested in
                  <select
                    className="rounded-[8px] border border-gold/25 bg-oliveMain/55 px-4 py-3 text-textMain outline-none transition duration-300 focus:border-gold"
                    name="interest"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select one
                    </option>
                    <option>Painting</option>
                    <option>Renovation</option>
                    <option>Painter Training</option>
                  </select>
                </label>
                <label className="grid gap-2 text-sm text-textMuted">
                  Preferred Date
                  <input
                    className="rounded-[8px] border border-gold/25 bg-oliveMain/55 px-4 py-3 text-textMain outline-none transition duration-300 focus:border-gold"
                    name="date"
                    type="date"
                  />
                </label>
              </div>
              <label className="grid gap-2 text-sm text-textMuted">
                Message
                <textarea
                  className="min-h-32 rounded-[8px] border border-gold/25 bg-oliveMain/55 px-4 py-3 text-textMain outline-none transition duration-300 focus:border-gold"
                  name="message"
                />
              </label>
              <button type="submit" className={premiumButtonClass("primary")}>
                Submit Request
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
