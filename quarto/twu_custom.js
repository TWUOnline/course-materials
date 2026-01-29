document.addEventListener("DOMContentLoaded", () => {

  // ---------------------------------
  // 1. Update data-number from filename
  // ---------------------------------
  const file = window.location.pathname.split("/").pop();
  const match = file.match(/u(\d+)/i);
  if (!match) return;

  const unitNumber = match[1];

  document.querySelectorAll("[data-number]").forEach(el => {
    const value = el.dataset.number;
    if (!value) return;

    el.dataset.number = value.replace(/^\d+/, unitNumber);
  });


  // ---------------------------------
  // 2. Update visible heading numbers
  // ---------------------------------
  document.querySelectorAll(".header-section-number").forEach(span => {
    const parent = span.closest("[data-number]");
    if (!parent) return;

    span.textContent = parent.dataset.number;
  });


  // ---------------------------------
  // 3. Update TOC numbers
  // ---------------------------------
  document.querySelectorAll("#TOC a[href^='#']").forEach(link => {
    const id = link.getAttribute("href").slice(1);
    const heading = document.getElementById(id);
    if (!heading || !heading.dataset.number) return;

    const tocSpan = link.querySelector(".toc-active");
    if (tocSpan) {
      tocSpan.textContent = heading.dataset.number;
    }
  });

});