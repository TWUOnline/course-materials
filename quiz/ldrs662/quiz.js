document.addEventListener("DOMContentLoaded", function () {
  if (typeof Sortable === "undefined") {
    console.error("SortableJS not loaded. Check script order / CDN.");
    return;
  }

  document.querySelectorAll(".fibq").forEach((quiz) => {
    const bank = quiz.querySelector(".fibq-bank");
    const blanks = quiz.querySelectorAll(".fibq-blank");
    const checkBtn = quiz.querySelector(".fibq-check");
    const retryBtn = quiz.querySelector(".fibq-retry");
    const output = quiz.querySelector(".fibq-output");

    if (!bank || blanks.length === 0 || !checkBtn || !retryBtn || !output)
      return;

    // bank sortable (drag between bank + blanks)
    new Sortable(bank, {
      group: quiz.dataset.quiz || "fibq",
      animation: 150,
      sort: true,
    });

    // each blank: accept only 1 item
    blanks.forEach((blank) => {
      new Sortable(blank, {
        group: quiz.dataset.quiz || "fibq",
        animation: 150,
        sort: false,
        onAdd: function (evt) {
          // if blank already had a word, move the new one back to bank
          if (blank.querySelectorAll(".fibq-word").length > 1) {
            bank.appendChild(evt.item);
          }
        },
      });
    });

    // CHECK
    checkBtn.addEventListener("click", () => {
      let correct = 0;
      let total = blanks.length;

      blanks.forEach((blank) => {
        blank.classList.remove("fibq-correct", "fibq-wrong");

        const placed = blank.querySelector(".fibq-word");
        const expected = (blank.dataset.answer || "").trim();

        if (!placed) {
          blank.classList.add("fibq-wrong");
          return;
        }

        const got = placed.textContent.trim();

        if (got === expected) {
          correct++;
          blank.classList.add("fibq-correct");
        } else {
          blank.classList.add("fibq-wrong");
        }
      });

      output.textContent = `Score: ${correct}/${total}`;
    });

    // RETRY
    retryBtn.addEventListener("click", () => {
      blanks.forEach((blank) => {
        blank.classList.remove("fibq-correct", "fibq-wrong");
        blank
          .querySelectorAll(".fibq-word")
          .forEach((w) => bank.appendChild(w));
      });
      output.textContent = "";
    });
  });
});

// True and False Quiz

(function () {
  "use strict";

  function initTFQ(root) {
    const answer = (root.dataset.answer || "").trim().toLowerCase();
    const optionBtns = Array.from(root.querySelectorAll(".tfq-option"));
    const checkBtn = root.querySelector(".tfq-check");
    const retryBtn = root.querySelector(".tfq-retry");
    const output = root.querySelector(".tfq-output");

    let selected = null;
    let checked = false;

    function setOutput(msg) {
      if (output) output.textContent = msg || "";
    }

    function clearState() {
      selected = null;
      checked = false;
      root.classList.remove("is-correct", "is-incorrect");

      optionBtns.forEach((btn) => {
        btn.classList.remove("is-selected", "is-correct", "is-wrong");
        btn.setAttribute("aria-pressed", "false");
        btn.disabled = false;
      });

      if (checkBtn) checkBtn.disabled = false;
      setOutput("");
    }

    function choose(btn) {
      if (checked) return;

      optionBtns.forEach((b) => {
        b.classList.remove("is-selected");
        b.setAttribute("aria-pressed", "false");
      });

      btn.classList.add("is-selected");
      btn.setAttribute("aria-pressed", "true");
      selected = btn.dataset.value;
      setOutput("");
    }

    function check() {
      if (checked) return;

      if (!selected) {
        setOutput("Please select True or False.");
        return;
      }

      checked = true;

      const isCorrect = selected === answer;

      root.classList.toggle("is-correct", isCorrect);
      root.classList.toggle("is-incorrect", !isCorrect);

      optionBtns.forEach((btn) => {
        const val = btn.dataset.value;
        const isAns = val === answer;
        const isSel = val === selected;

        if (isAns) btn.classList.add("is-correct");
        if (isSel && !isCorrect) btn.classList.add("is-wrong");

        btn.disabled = true;
      });

      if (checkBtn) checkBtn.disabled = true;

      setOutput(isCorrect ? "Correct!" : "Incorrect.");
    }

    optionBtns.forEach((btn) => {
      btn.addEventListener("click", () => choose(btn));
    });

    if (checkBtn) checkBtn.addEventListener("click", check);
    if (retryBtn) retryBtn.addEventListener("click", clearState);

    clearState();
  }

  window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".tfq").forEach(initTFQ);
  });
})();

// MCQ

(function () {
  "use strict";

  function parseAnswers(str) {
    return (str || "")
      .split("|")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  function initMCQ(block) {
    const correct = new Set(parseAnswers(block.dataset.answer));
    const checkBtn = block.querySelector(".mcq-check");
    const retryBtn = block.querySelector(".mcq-retry");
    const output = block.querySelector(".mcq-output");
    const options = Array.from(block.querySelectorAll(".mcq-option"));
    const inputs = Array.from(block.querySelectorAll('input[type="checkbox"]'));

    let checked = false;

    function setOutput(msg) {
      if (output) output.textContent = msg || "";
    }

    function clearMarks() {
      block.classList.remove("is-checked");
      options.forEach((opt) =>
        opt.classList.remove("is-correct", "is-wrong", "is-missed"),
      );
      inputs.forEach((inp) => (inp.disabled = false));
      checked = false;
      if (checkBtn) checkBtn.disabled = false;
      setOutput("");
    }

    function check() {
      if (checked) return;

      // gather selected values
      const selected = new Set(
        inputs.filter((i) => i.checked).map((i) => i.value),
      );

      // score
      let score = 0;
      correct.forEach((ans) => {
        if (selected.has(ans)) score++;
      });

      // mark each option
      options.forEach((opt) => {
        const inp = opt.querySelector('input[type="checkbox"]');
        const val = inp ? inp.value : "";

        const isCorrect = correct.has(val);
        const isSelected = selected.has(val);

        // correct options -> green (even if not selected, show missed)
        if (isCorrect && isSelected) opt.classList.add("is-correct");
        if (isCorrect && !isSelected) opt.classList.add("is-missed");

        // selected but not correct -> red
        if (!isCorrect && isSelected) opt.classList.add("is-wrong");
      });

      // lock
      inputs.forEach((i) => (i.disabled = true));
      if (checkBtn) checkBtn.disabled = true;
      checked = true;
      block.classList.add("is-checked");

      setOutput(`${score}/${correct.size}`);
    }

    if (checkBtn) checkBtn.addEventListener("click", check);
    if (retryBtn)
      retryBtn.addEventListener("click", () => {
        inputs.forEach((i) => (i.checked = false));
        clearMarks();
      });

    // init state
    clearMarks();
  }

  window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".mcq").forEach(initMCQ);
  });
})();
