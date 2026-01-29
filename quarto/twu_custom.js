document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".header-section-number").forEach(span => {
    const parent = span.closest("[data-number]");
    if (!parent) return;


    // copy value only (do not modify attribute)
    span.textContent = parent.dataset.number;
  });
});