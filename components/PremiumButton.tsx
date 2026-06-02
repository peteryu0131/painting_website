import Link from "next/link";
import type { ReactNode } from "react";

type PremiumButtonProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
  className?: string;
};

const baseClass =
  "inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-oliveMain";

const variants = {
  primary:
    "bg-gold text-oliveMain shadow-premium hover:bg-gold/90 hover:-translate-y-0.5",
  secondary:
    "border border-gold/45 bg-white/5 text-textMain hover:border-gold hover:bg-white/10 hover:-translate-y-0.5",
};

export function premiumButtonClass(variant: "primary" | "secondary" = "primary") {
  return `${baseClass} ${variants[variant]}`;
}

export function PremiumButton({
  children,
  href,
  variant = "primary",
  className = "",
}: PremiumButtonProps) {
  return (
    <Link href={href} className={`${premiumButtonClass(variant)} ${className}`}>
      {children}
    </Link>
  );
}
