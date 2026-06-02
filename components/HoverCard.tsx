import type { ReactNode } from "react";

type HoverCardProps = {
  label?: string;
  title: string;
  description?: string;
  items?: string[];
  children?: ReactNode;
  className?: string;
  reveal?: "card" | "process" | "portfolio" | "cta";
  tone?: "dark" | "light";
};

export function HoverCard({
  label,
  title,
  description,
  items,
  children,
  className = "",
  reveal = "card",
  tone = "dark",
}: HoverCardProps) {
  const styles =
    tone === "light"
      ? {
          card: "border-gold/30 bg-cream text-oliveMain shadow-[0_18px_50px_rgba(58,50,30,0.13)] hover:border-gold/55 hover:bg-textMain",
          label: "text-goldSoft",
          title: "text-oliveMain",
          description: "text-oliveMain/72",
          list: "text-oliveMain/80",
          bullet: "bg-goldSoft",
        }
      : {
          card: "border-gold/25 bg-oliveCard text-textMain shadow-premium hover:border-gold/50 hover:bg-oliveCard/90",
          label: "text-gold",
          title: "text-textMain",
          description: "text-textMuted",
          list: "text-textMain/88",
          bullet: "bg-gold",
        };

  return (
    <article
      data-card-reveal={reveal === "card" ? true : undefined}
      data-process-reveal={reveal === "process" ? true : undefined}
      data-portfolio-reveal={reveal === "portfolio" ? true : undefined}
      data-cta-reveal={reveal === "cta" ? true : undefined}
      className={`group rounded-[8px] border p-6 transition duration-300 hover:-translate-y-1 ${styles.card} ${className}`}
    >
      {label ? (
        <p className={`mb-4 text-sm font-semibold ${styles.label}`}>{label}</p>
      ) : null}
      <h3 className={`font-serifDisplay text-2xl ${styles.title}`}>{title}</h3>
      {description ? (
        <p className={`mt-3 leading-7 ${styles.description}`}>{description}</p>
      ) : null}
      {items ? (
        <ul className={`mt-6 space-y-3 text-sm ${styles.list}`}>
          {items.map((item) => (
            <li key={item} className="flex gap-3">
              <span className={`mt-2 h-1.5 w-1.5 flex-none rounded-full ${styles.bullet}`} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {children}
    </article>
  );
}
