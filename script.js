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
      status.textContent = "Consultation request noted. Connect this form to your studio email or CRM when ready.";
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

  gsap.from("[data-animate='hero']", {
    autoAlpha: 0,
    y: 22,
    duration: 1,
    ease: "power3.out",
    stagger: 0.11,
  });

  gsap.from("[data-animate='hero-image']", {
    autoAlpha: 0,
    clipPath: "inset(12% 0% 12% 0%)",
    duration: 1.15,
    ease: "power3.out",
  });

  gsap.from(".hero-image-wrap img", {
    scale: 1.08,
    duration: 1.45,
    ease: "power3.out",
  });

  gsap.from("[data-animate='floating'] span", {
    autoAlpha: 0,
    y: 18,
    duration: 0.72,
    delay: 0.42,
    ease: "power3.out",
    stagger: 0.08,
  });

  if (window.ScrollTrigger) {
    const batchReveal = (selector, options = {}) => {
      ScrollTrigger.batch(selector, {
        interval: 0.08,
        batchMax: options.batchMax || 4,
        start: options.start || "top 84%",
        once: true,
        onEnter: (batch) => {
          gsap.from(batch, {
            autoAlpha: 0,
            y: options.y || 28,
            duration: options.duration || 0.78,
            ease: "power3.out",
            stagger: options.stagger || 0.08,
          });
        },
      });
    };

    batchReveal("[data-animate='card']", { y: 24, batchMax: 3 });
    batchReveal("[data-animate='process']", { y: 28, batchMax: 4 });
    batchReveal("[data-animate='portfolio']", { y: 24, batchMax: 3 });
    batchReveal("[data-animate='contact']", { y: 30, batchMax: 1 });

    gsap.utils.toArray(".process-visual, .project-image").forEach((element) => {
      gsap.from(element, {
        clipPath: "inset(0% 100% 0% 0%)",
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 86%",
          once: true,
        },
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
  }
});
