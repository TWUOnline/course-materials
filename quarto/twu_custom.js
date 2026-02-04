document.addEventListener("DOMContentLoaded", () => {

  const file = window.location.pathname.split("/").pop();

  // UPDATED — supports u1, u-1, u_1, unit1, unit-1, unit_1
  const match = file.match(/^(?:u|unit)[-_]?(\d+)/i);
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

const carousel = document.querySelector('#carouselExampleIndicators');
const bsCarousel = new bootstrap.Carousel(carousel);

document.querySelector('.carousel-control-next')
  .addEventListener('click', () => bsCarousel.next());

document.querySelector('.carousel-control-prev')
  .addEventListener('click', () => bsCarousel.prev());
