document.addEventListener("DOMContentLoaded", () => {

  const file = window.location.pathname.split("/").pop();
  const match = file.match(/u(\d+)/i);
  if (!match) return;

  const unitNumber = match[1];

  // 1. Update data-number attributes
  document.querySelectorAll("[data-number]").forEach(el => {
    const value = el.dataset.number;
    if (!value) return;

    el.dataset.number = value.replace(/^\d+/, unitNumber);
  });

  // 2. Update visible heading numbers (uses data-number)
  document.querySelectorAll("[data-number] .header-section-number").forEach(span => {
    const parent = span.closest("[data-number]");
    span.textContent = parent.dataset.number;
  });

  // 3. Update TOC numbers (no data-number available)
  document.querySelectorAll("#TOC .header-section-number").forEach(span => {
    const current = span.textContent.trim();
    span.textContent = current.replace(/^\d+/, unitNumber);
  });

});