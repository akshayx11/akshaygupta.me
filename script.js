const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll("[href^='#']")].filter((link) => link.hash);
const contactForm = document.querySelector(".contact-form");

const setActive = (id) => {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.hash === `#${id}`);
  });
};

const currentSectionId = () => {
  const hashId = window.location.hash.slice(1);

  if (hashId && document.getElementById(hashId)) {
    return hashId;
  }

  return sections[0]?.id;
};

const scrollToHash = () => {
  const hashId = window.location.hash.slice(1);
  const target = hashId ? document.getElementById(hashId) : null;

  if (target) {
    target.scrollIntoView({ block: "start" });
  }
};

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible) {
      setActive(visible.target.id);
    }
  },
  {
    rootMargin: "-20% 0px -55% 0px",
    threshold: [0.2, 0.45, 0.7],
  }
);

sections.forEach((section) => observer.observe(section));
setActive(currentSectionId());
scrollToHash();

window.addEventListener("hashchange", () => {
  setActive(currentSectionId());
  scrollToHash();
});

window.addEventListener("load", scrollToHash);

document.querySelectorAll("a[href^='#']").forEach((link) => {
  link.addEventListener("click", () => {
    const id = link.getAttribute("href").slice(1);
    if (id) {
      setActive(id);
    }
  });
});

if (contactForm) {
  const status = contactForm.querySelector(".form-status");
  const submitButton = contactForm.querySelector("[type='submit']");
  const defaultButtonText = submitButton?.textContent || "Send message";

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (status) {
      status.textContent = "Sending your message...";
      status.className = "form-status";
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      contactForm.reset();
      if (status) {
        status.textContent = "Thanks, your message has been sent. I will get back to you soon.";
        status.className = "form-status success";
      }
    } catch {
      if (status) {
        status.textContent = "Something went wrong. Please email hello@akshaygupta.me or try again.";
        status.className = "form-status error";
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = defaultButtonText;
      }
    }
  });
}
