document.addEventListener("DOMContentLoaded", () => {

  // 1. Get unit number from filename (u3.html → 3)
  const file = window.location.pathname.split("/").pop();
  const match = file.match(/u(\d+)/i);
  if (!match) return;

  const unitNumber = match[1];


  // 2. Update all data-number attributes
  document.querySelectorAll("[data-number]").forEach(el => {
    const value = el.dataset.number;
    if (!value) return;

    el.dataset.number = value.replace(/^\d+/, unitNumber);
  });


  // 3. Sync ALL visible numbers (headings + TOC)
  document.querySelectorAll(".header-section-number").forEach(span => {
    const parent = span.closest("[data-number]");
    if (!parent) return;

    span.textContent = parent.dataset.number;
  });

});