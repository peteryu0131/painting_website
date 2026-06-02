"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ScrollAnimations() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.from("[data-hero-reveal]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
      });

      const reveal = (selector: string, y = 26) => {
        gsap.utils.toArray<HTMLElement>(selector).forEach((element) => {
          gsap.from(element, {
            autoAlpha: 0,
            y,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 84%",
              once: true,
            },
          });
        });
      };

      reveal("[data-card-reveal]");
      reveal("[data-process-reveal]", 18);
      reveal("[data-portfolio-reveal]", 20);
      reveal("[data-cta-reveal]", 22);

      gsap.utils.toArray<HTMLElement>("[data-image-reveal]").forEach((element) => {
        gsap.from(element, {
          autoAlpha: 0,
          clipPath: "inset(10% 0% 0% 0%)",
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 82%",
            once: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax-image]").forEach((image) => {
        gsap.to(image, {
          yPercent: -7,
          ease: "none",
          scrollTrigger: {
            trigger: image.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      });
    });

    return () => context.revert();
  }, []);

  return null;
}
