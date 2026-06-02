const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("[data-nav]");
const bookingForm = document.querySelector(".booking-form");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

if (bookingForm) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const status = bookingForm.querySelector(".form-status");
    const requiredFields = bookingForm.querySelectorAll("[required]");
    const missingField = Array.from(requiredFields).find((field) => !field.value.trim());

    if (missingField) {
      missingField.focus();
      if (status) {
        status.textContent = "Please complete the required fields before submitting.";
      }
      return;
    }

    bookingForm.reset();
    if (status) {
      status.textContent = "Request noted. Connect this form to your booking email or CRM when ready.";
    }
  });
}

window.addEventListener("load", () => {
  if (!window.gsap) {
    return;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    return;
  }

  const { gsap } = window;

  if (window.ScrollTrigger) {
    gsap.registerPlugin(window.ScrollTrigger);
  }

  gsap.from(".hero-reveal", {
    autoAlpha: 0,
    y: 24,
    duration: 0.9,
    ease: "power3.out",
    stagger: 0.12,
  });

  gsap.from(".hero-image-wrap img", {
    scale: 1.08,
    autoAlpha: 0,
    duration: 1.2,
    ease: "power3.out",
  });

  gsap.from(".floating-process span", {
    autoAlpha: 0,
    y: 16,
    duration: 0.65,
    delay: 0.35,
    ease: "power3.out",
    stagger: 0.08,
  });

  const revealGroups = [
    [".reveal-card", { y: 28 }],
    [".reveal-process", { y: 30 }],
    [".reveal-portfolio", { y: 26 }],
    [".reveal-contact", { y: 28 }],
  ];

  revealGroups.forEach(([selector, options]) => {
    gsap.utils.toArray(selector).forEach((element) => {
      gsap.from(element, {
        autoAlpha: 0,
        y: options.y,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 84%",
          once: true,
        },
      });
    });
  });

  gsap.to(".hero-image-wrap img", {
    yPercent: 5,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
});
