document.addEventListener("DOMContentLoaded", () => {

  // -------------------------
  // 1. Update data-number
  // -------------------------
  const file = window.location.pathname.split("/").pop();
  const match = file.match(/u(\d+)/i);
  if (!match) return;

  const unitNumber = match[1];

  document.querySelectorAll("[data-number]").forEach(el => {
    const value = el.dataset.number;
    if (!value) return;

    const updated = value.replace(/^\d+/, unitNumber);
    el.dataset.number = updated;
  });


  // -------------------------
  // 2. Update visible numbers ONLY
  // -------------------------
  document.querySelectorAll(".header-section-number").forEach(span => {
    const parent = span.closest("[data-number]");
    if (!parent) return;

    span.textContent = parent.dataset.number;
  });

});