$(document).ready(function () {
    $("select").change(function () {
        $(this).find("option:selected").each(function () {
            const iframes = document.querySelectorAll("iframe.video");
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

    var lightboxQuarto = GLightbox({ "closeEffect": "zoom", "descPosition": "top", "loop": false, "openEffect": "zoom", "selector": ".lightbox" });
    (function () {
        let previousOnload = window.onload;
        window.onload = () => {
            if (previousOnload) {
                previousOnload();
            }
            lightboxQuarto.on('slide_before_load', (data) => {
                const { slideIndex, slideNode, slideConfig, player, trigger } = data;
                const href = trigger.getAttribute('href');
                if (href !== null) {
                    const imgEl = window.document.querySelector(`a[href="${href}"] img`);
                    if (imgEl !== null) {
                        const srcAttr = imgEl.getAttribute("src");
                        if (srcAttr && srcAttr.startsWith("data:")) {
                            slideConfig.href = srcAttr;
                        }
                    }
                }
            });

            lightboxQuarto.on('slide_after_load', (data) => {
                const { slideIndex, slideNode, slideConfig, player, trigger } = data;
                if (window.Quarto?.typesetMath) {
                    window.Quarto.typesetMath(slideNode);
                }
            });

        };

    })();
});


