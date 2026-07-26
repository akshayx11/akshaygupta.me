const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll("[href^='#']")].filter((link) => link.hash);

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
