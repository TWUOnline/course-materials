$(document).ready(function () {console.log("ready");
    $("select").change(function () {
        console.log("change");
        $(this).find("option:selected").each(function () {
            console.log("selected");
            var optionValue = $(this).attr("value"); console.log(optionValue);
            if (optionValue) {
                $(".toggle-box").not("." + optionValue).hide();
                $("." + optionValue).show();
            } else {
                $(".toggle-box").hide();
            }
        });
    }).change();
});
