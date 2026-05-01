(function () {
  "use strict";

  function update_total_correct() {
    var totals = document.getElementsByClassName("webex-total_correct");

    for (var i = 0; i < totals.length; i++) {
      var section = totals[i].parentElement;

      var groups = section.querySelectorAll(".webex-radiogroup");
      var answered = 0;
      var correct = 0;

      for (var g = 0; g < groups.length; g++) {
        var checked = groups[g].querySelector('input[type="radio"]:checked');

        if (checked) {
          answered++;
          if (checked.value === "answer") {
            correct++;
          }
        }
      }

      if (section.classList.contains("unchecked")) {
        totals[i].textContent = "";
      } else {
        totals[i].textContent =
          correct +
          " of " +
          groups.length +
          " correct • " +
          answered +
          " of " +
          groups.length +
          " answered";
      }
    }
  }

  function b_func() {
    var cl = this.parentElement.classList;
    if (cl.contains("open")) cl.remove("open");
    else cl.add("open");
  }

  function reset_section(section) {
    var solveme = section.querySelectorAll(".webex-solveme");
    for (var i = 0; i < solveme.length; i++) {
      solveme[i].value = "";
      solveme[i].classList.remove("webex-correct");
      solveme[i].classList.remove("webex-incorrect");
    }

    var selects = section.querySelectorAll(".webex-select");
    for (var s = 0; s < selects.length; s++) {
      selects[s].selectedIndex = 0;
      selects[s].classList.remove("webex-correct");
      selects[s].classList.remove("webex-incorrect");
    }

    var radiogroups = section.querySelectorAll(".webex-radiogroup");
    for (var r = 0; r < radiogroups.length; r++) {
      var radios = radiogroups[r].querySelectorAll('input[type="radio"]');
      for (var j = 0; j < radios.length; j++) {
        radios[j].checked = false;
      }

      var labels = radiogroups[r].querySelectorAll("label");
      for (var k = 0; k < labels.length; k++) {
        labels[k].classList.remove("webex-correct");
        labels[k].classList.remove("webex-incorrect");
      }
    }

    update_total_correct();
  }

  function check_func() {
    var section = this.parentElement;
    var cl = section.classList;

    if (cl.contains("unchecked")) {
      cl.remove("unchecked");
      this.textContent = "Clear Result";
      update_total_correct();
    } else {
      cl.add("unchecked");
      reset_section(section);
      this.textContent = "Show Answers";
    }
  }

  function solveme_func() {
    var real_answers;
    try {
      real_answers = JSON.parse(this.dataset.answer || "[]");
    } catch (_) {
      real_answers = [];
    }

    var my_answer = this.value;
    var cl = this.classList;

    if (cl.contains("ignorecase")) my_answer = my_answer.toLowerCase();
    if (cl.contains("nospaces")) my_answer = my_answer.replace(/ /g, "");

    if (my_answer === "") {
      cl.remove("webex-correct");
      cl.remove("webex-incorrect");
    } else if (real_answers.includes(my_answer)) {
      cl.add("webex-correct");
      cl.remove("webex-incorrect");
    } else {
      cl.add("webex-incorrect");
      cl.remove("webex-correct");
    }

    update_total_correct();
  }

  function select_func() {
    update_total_correct();
  }

  function radiogroups_func() {
    var checked_button = this.querySelector('input[type="radio"]:checked');
    if (!checked_button) return;

    var labels = this.querySelectorAll("label");

    for (var i = 0; i < labels.length; i++) {
      labels[i].classList.remove("webex-incorrect");
      labels[i].classList.remove("webex-correct");
    }

    if (checked_button.value === "answer") {
      checked_button.parentElement.classList.add("webex-correct");
    } else {
      checked_button.parentElement.classList.add("webex-incorrect");
    }

    update_total_correct();
  }

  window.onload = function () {
    var buttons = document.getElementsByTagName("button");
    for (var i = 0; i < buttons.length; i++) {
      if (
        buttons[i].parentElement &&
        buttons[i].parentElement.classList.contains("webex-solution")
      ) {
        buttons[i].onclick = b_func;
      }
    }

    var check_sections = document.getElementsByClassName("webex-check");
    for (var j = 0; j < check_sections.length; j++) {
      check_sections[j].classList.add("unchecked");

      var btn = document.createElement("button");
      btn.textContent = "Show Answers";
      btn.classList.add("webex-check-button");
      btn.onclick = check_func;
      check_sections[j].appendChild(btn);

      var spn = document.createElement("span");
      spn.classList.add("webex-total_correct");
      check_sections[j].appendChild(spn);
    }

    var solveme = document.getElementsByClassName("webex-solveme");
    for (var k = 0; k < solveme.length; k++) {
      solveme[k].setAttribute("autocomplete", "off");
      solveme[k].setAttribute("autocorrect", "off");
      solveme[k].setAttribute("autocapitalize", "off");
      solveme[k].setAttribute("spellcheck", "false");
      solveme[k].value = "";
      solveme[k].onkeyup = solveme_func;
      solveme[k].onchange = solveme_func;

      solveme[k].insertAdjacentHTML(
        "afterend",
        " <span class='webex-icon'></span>",
      );
    }

    var radiogroups = document.getElementsByClassName("webex-radiogroup");
    for (var r = 0; r < radiogroups.length; r++) {
      radiogroups[r].onchange = radiogroups_func;
    }

    var selects = document.getElementsByClassName("webex-select");
    for (var s = 0; s < selects.length; s++) {
      selects[s].onchange = select_func;
      selects[s].insertAdjacentHTML(
        "afterend",
        " <span class='webex-icon'></span>",
      );
    }

    update_total_correct();
  };
})();
