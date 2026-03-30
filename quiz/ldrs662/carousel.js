(function () {
  "use strict";

  function initSimpleCarousel(section) {
    // Each question block = one radiogroup
    var groups = Array.from(section.querySelectorAll(".webex-radiogroup"));
    if (groups.length <= 1) return;

    // Prevent double init
    if (section.dataset.carouselInit === "true") return;
    section.dataset.carouselInit = "true";

    /* -----------------------------
       Build slides
    ------------------------------ */
    var slides = groups.map(function (grp, idx) {
      var slide = document.createElement("div");
      slide.className = "webex-slide" + (idx === 0 ? " active" : "");

      // Move the question text (usually the <p> before the radiogroup)
      var qText = grp.previousElementSibling;
      if (qText && qText.tagName === "P") {
        slide.appendChild(qText);
      }

      // Move the radiogroup into the slide
      slide.appendChild(grp);

      // Put slide back into section
      section.appendChild(slide);

      return slide;
    });

    /* -----------------------------
       Progress text
    ------------------------------ */
    var progress = document.createElement("div");
    progress.className = "webex-carousel-progress";
    section.insertBefore(progress, section.firstChild);

    /* -----------------------------
       Navigation buttons
    ------------------------------ */
    var nav = document.createElement("div");
    nav.className = "webex-carousel-nav";

    var prevBtn = document.createElement("button");
    prevBtn.type = "button";
    prevBtn.className = "webex-carousel-prev";
    prevBtn.textContent = "Prev";

    var nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.className = "webex-carousel-next";
    nextBtn.textContent = "Next";

    nav.appendChild(prevBtn);
    nav.appendChild(nextBtn);
    section.appendChild(nav);

    /* -----------------------------
       Move existing quiz controls
    ------------------------------ */
    var showBtn = section.querySelector(".webex-check-button");
    if (showBtn) {
      nav.insertAdjacentElement("afterend", showBtn);
    }

    var score = section.querySelector(".webex-total_correct");
    if (score && showBtn) {
      showBtn.insertAdjacentElement("afterend", score);
    }

    /* -----------------------------
       Carousel logic
    ------------------------------ */
    var i = 0;

    function update() {
      slides.forEach(function (slide, idx) {
        slide.classList.toggle("active", idx === i);
      });

      progress.textContent = "Question " + (i + 1) + " of " + slides.length;
      prevBtn.disabled = i === 0;
      nextBtn.disabled = i === slides.length - 1;
    }

    function goToFirst() {
      i = 0;
      update();
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    prevBtn.addEventListener("click", function () {
      if (i > 0) {
        i--;
        update();
      }
    });

    nextBtn.addEventListener("click", function () {
      if (i < slides.length - 1) {
        i++;
        update();
      }
    });

    /* -----------------------------
       Reset to Question 1 when
       "Clear result" is clicked
    ------------------------------ */
    section.addEventListener("click", function (e) {
      var clearBtn = e.target.closest(".webex-clear-button, button, a");

      if (!clearBtn) return;

      var text = (clearBtn.textContent || "").trim().toLowerCase();

      if (
        clearBtn.classList.contains("webex-clear-button") ||
        text === "clear result" ||
        text === "clear results"
      ) {
        // Wait until the quiz reset finishes, then jump back
        setTimeout(function () {
          goToFirst();
        }, 0);
      }
    });

    update();
  }

  /* -----------------------------
     Init after page load
  ------------------------------ */
  window.addEventListener("load", function () {
    document.querySelectorAll(".webex-check").forEach(initSimpleCarousel);
  });
})();
