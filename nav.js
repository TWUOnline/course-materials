<script>
(function () {
  'use strict';

  function initSimpleCarousel(section) {

    // Each question = the block that contains a radiogroup
    var groups = Array.from(section.querySelectorAll('.webex-radiogroup'));
    if (groups.length <= 1) return;

    // Wrap each question block into a slide
    var slides = groups.map(function (grp, idx) {
      var slide = document.createElement('div');
      slide.className = 'webex-slide' + (idx === 0 ? ' active' : '');

      // Move the QUESTION TEXT + radiogroup into the slide
      var qText = grp.previousElementSibling;
      if (qText && qText.tagName === 'P') {
        slide.appendChild(qText);
      }
      slide.appendChild(grp);

      section.insertBefore(slide, grp.nextSibling);
      return slide;
    });

    /* -----------------------------
       Progress text
    ------------------------------ */
    var progress = document.createElement('div');
    progress.className = 'webex-carousel-progress';

    /* -----------------------------
       Navigation buttons
    ------------------------------ */
    var nav = document.createElement('div');
    nav.className = 'webex-carousel-nav';

    var prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.textContent = 'Prev';

    var nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.textContent = 'Next';

    nav.appendChild(prevBtn);
    nav.appendChild(nextBtn);
    
    
    section.insertBefore(progress, section.firstChild);
    
    section.appendChild(nav);


    var showBtn = section.querySelector('.webex-check-button');
    if (showBtn) {
      nav.insertAdjacentElement('afterend', showBtn);
    }

    var score = section.querySelector('.webex-total_correct');
    if (score && showBtn) {
      showBtn.insertAdjacentElement('afterend', score);
    }

    /* -----------------------------
       Carousel logic
    ------------------------------ */
    var i = 0;

    function update() {
      slides.forEach(function (s, idx) {
        s.classList.toggle('active', idx === i);
      });
      progress.textContent = 'Question ' + (i + 1) + ' of ' + slides.length;
      prevBtn.disabled = (i === 0);
      nextBtn.disabled = (i === slides.length - 1);
    }

    prevBtn.onclick = function () {
      if (i > 0) {
        i--;
        update();
      }
    };

    nextBtn.onclick = function () {
      if (i < slides.length - 1) {
        i++;
        update();
      }
    };

    update();
  }

  // Run AFTER everything is loaded 
  window.addEventListener('load', function () {
    document.querySelectorAll('.webex-check').forEach(initSimpleCarousel);
  });
})();
</script>
