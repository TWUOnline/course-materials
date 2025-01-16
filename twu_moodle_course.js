$(document).ready(function () {
    $("select").change(function () {
        $(this).find("option:selected").each(function () {
            const iframes = document.querySelectorAll("iframe");
            iframes.forEach((videoframe) => {
                const iframePlayer = new Vimeo.Player(videoframe);
                iframePlayer.pause();
            });
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
