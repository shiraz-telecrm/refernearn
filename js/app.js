const body = document.body;
const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navMenu = document.querySelector("[data-nav-menu]");
const referralForm = document.querySelector("[data-referral-form]");
const successMessage = document.querySelector("[data-form-success]");

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 8);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

navToggle?.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  body.classList.toggle("nav-open", isOpen);
});

navMenu?.addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (!link) return;

  navMenu.classList.remove("is-open");
  navToggle?.setAttribute("aria-expanded", "false");
  navToggle?.setAttribute("aria-label", "Open navigation");
  body.classList.remove("nav-open");
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

referralForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!referralForm.checkValidity()) {
    referralForm.reportValidity();
    return;
  }

  referralForm.reset();
  if (successMessage) {
    successMessage.hidden = false;
    successMessage.focus?.();
  }
});
