document.addEventListener("DOMContentLoaded", () => {
  const spans = document.querySelectorAll(".header-section-number");


  spans.forEach(span => {
    const parent = span.closest("[data-number]");
    if (!parent) return;


    const value = parent.dataset.number;


    // remove existing content completely
    span.replaceChildren();


    // insert fresh value
    span.append(value);
  });
});