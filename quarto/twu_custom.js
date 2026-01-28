document.addEventListener("DOMContentLoaded", () => {
  // Get filename (e.g., u3.html)
  const file = window.location.pathname.split("/").pop();

  // Extract unit number
  const match = file.match(/u(\d+)/i);
  if (!match) return;

  const unitNumber = match[1]; // "3"

  document.querySelectorAll("[data-number]").forEach(el => {
    const value = el.dataset.number; // e.g., "1.1"

  if (!value) return;

  // Replace ONLY the first number segment
  const updated = value.replace(/^\d+/, unitNumber);

  el.dataset.number = updated;
  });
});