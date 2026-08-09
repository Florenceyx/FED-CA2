const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("in");
    observer.unobserve(entry.target);
  });
}, { threshold: 0.18 });

document.querySelectorAll(".cq-card.reveal").forEach((card) => {
  revealObserver.observe(card);
});
