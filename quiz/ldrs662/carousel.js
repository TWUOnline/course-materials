(function () {
  "use strict";

  function initCarousel(section) {
    const slides = Array.from(section.querySelectorAll(".quiz-slide"));
    if (slides.length <= 1) return;

    // Add active class to first
    slides[0].classList.add("active");

    /* Progress */
    const progress = document.createElement("div");
    progress.className = "quiz-progress";

    /* Navigation */
    const nav = document.createElement("div");
    nav.className = "quiz-nav";

    const prev = document.createElement("button");
    prev.textContent = "Prev";

    const next = document.createElement("button");
    next.textContent = "Next";

    nav.appendChild(prev);
    nav.appendChild(next);

    section.insertBefore(progress, section.firstChild);
    section.appendChild(nav);

    let i = 0;

    function update() {
      slides.forEach((s, idx) => {
        s.classList.toggle("active", idx === i);
      });

      progress.textContent = `Question ${i + 1} of ${slides.length}`;

      prev.disabled = i === 0;
      next.disabled = i === slides.length - 1;
    }

    prev.onclick = () => {
      if (i > 0) {
        i--;
        update();
      }
    };

    next.onclick = () => {
      if (i < slides.length - 1) {
        i++;
        update();
      }
    };

    update();
  }

  window.addEventListener("load", function () {
    document.querySelectorAll(".quiz-carousel").forEach(initCarousel);
  });
})();
