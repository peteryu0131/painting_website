const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("[data-nav]");
const bookingForm = document.querySelector(".booking-form");
const scrollProgress = document.querySelector("[data-scroll-progress]");
const floatingConsultation = document.querySelector("[data-floating-consultation]");
const selectionNote = document.querySelector("[data-selection-note]");
const navLinks = Array.from(document.querySelectorAll(".site-nav a[href^='#']"));
const sectionTargets = navLinks
  .map((link) => {
    const id = link.getAttribute("href").slice(1);
    return { id, link, section: document.getElementById(id) };
  })
  .filter((item) => item.section)
  .sort((a, b) => a.section.offsetTop - b.section.offsetTop);
const serviceCards = document.querySelectorAll("[data-project-type]");
const defaultSelectionNote = "Select a service card to prefill your consultation request.";

const updateSelectedProjectNote = (projectType) => {
  if (!selectionNote) {
    return;
  }

  selectionNote.textContent = projectType
    ? `Selected service: ${projectType}. The form is ready for your consultation notes.`
    : defaultSelectionNote;
};

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
    updateSelectedProjectNote("");
    if (status) {
      status.textContent = "Consultation request noted. Connect this form to your studio email or CRM when ready.";
    }
  });
}

const updateScrollExperience = () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

  if (scrollProgress) {
    const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    scrollProgress.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
  }

  if (floatingConsultation) {
    const shouldShow = window.scrollY > window.innerHeight * 0.72;
    floatingConsultation.classList.toggle("is-visible", shouldShow);
  }

  if (!sectionTargets.length) {
    return;
  }

  const activationPoint = window.innerHeight * 0.34;
  let current = sectionTargets[0];

  sectionTargets.forEach((item) => {
    if (item.section.getBoundingClientRect().top <= activationPoint) {
      current = item;
    }
  });

  sectionTargets.forEach((item) => {
    const isActive = item === current;
    item.link.classList.toggle("is-active", isActive);

    if (isActive) {
      item.link.setAttribute("aria-current", "page");
    } else {
      item.link.removeAttribute("aria-current");
    }
  });
};

let scrollUpdateQueued = false;

const queueScrollExperienceUpdate = () => {
  if (scrollUpdateQueued) {
    return;
  }

  scrollUpdateQueued = true;
  window.requestAnimationFrame(() => {
    updateScrollExperience();
    scrollUpdateQueued = false;
  });
};

window.addEventListener("scroll", queueScrollExperienceUpdate, { passive: true });
window.addEventListener("resize", queueScrollExperienceUpdate);
queueScrollExperienceUpdate();

if (bookingForm && serviceCards.length) {
  const projectTypeSelect = bookingForm.querySelector("select[name='interest']");
  const messageField = bookingForm.querySelector("textarea[name='message']");
  const contactSection = document.getElementById("contact");

  projectTypeSelect?.addEventListener("change", () => {
    updateSelectedProjectNote(projectTypeSelect.value);
  });
  updateSelectedProjectNote(projectTypeSelect?.value || "");

  const startProjectInquiry = (projectType) => {
    if (projectTypeSelect) {
      projectTypeSelect.value = projectType;
      projectTypeSelect.dispatchEvent(new Event("change", { bubbles: true }));
    }

    contactSection?.scrollIntoView({ behavior: "smooth", block: "start" });

    window.setTimeout(() => {
      messageField?.focus({ preventScroll: true });
    }, 520);
  };

  serviceCards.forEach((card) => {
    card.addEventListener("click", () => {
      startProjectInquiry(card.dataset.projectType);
    });

    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }

      event.preventDefault();
      startProjectInquiry(card.dataset.projectType);
    });
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
    y: 18,
    duration: 0.92,
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
            y: options.y ?? 28,
            duration: options.duration || 0.78,
            ease: "power3.out",
            stagger: options.stagger || 0.08,
          });
        },
      });
    };

    batchReveal("[data-animate='card']", { y: 0, batchMax: 3 });
    batchReveal("[data-animate='section-copy']", { y: 18, batchMax: 2, duration: 0.72, stagger: 0.06 });
    batchReveal("[data-animate='process']", { y: 0, batchMax: 4 });
    batchReveal("[data-animate='portfolio']", { y: 0, batchMax: 3 });
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
