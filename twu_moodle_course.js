$(document).ready(function () {
    $("select").change(function () {
        $(this).find("option:selected").each(function () {
            var optionValue = $(this).attr("value");
            if (optionValue) {
                $(".toggle-box").not("." + optionValue).hide();
                $("." + optionValue).show();
            } else {
                $(".toggle-box").hide();
                $("." + "english").show();
            }
        });
    }).change();
});
