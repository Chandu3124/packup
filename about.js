/* =====================================================
   PACKUP ABOUT HERO — INITIALIZATION
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       LUCIDE ICONS
    ===================================================== */

    function renderAboutHeroIcons() {

        if (window.lucide) {
            window.lucide.createIcons();
        }

    }

    renderAboutHeroIcons();


    /* =====================================================
       SYNC WITH EXISTING LIGHT / DARK MODE
    ===================================================== */

    function syncAboutHeroTheme() {

        const isDarkMode =
            document.body.classList.contains("dark-mode");

        document
            .querySelectorAll(".packup-about-hero")
            .forEach((hero) => {

                hero.dataset.theme = isDarkMode
                    ? "dark"
                    : "light";

            });

    }

    syncAboutHeroTheme();


    /* =====================================================
       SYNC WITH EXISTING RTL TOGGLE
    ===================================================== */

    function syncAboutHeroDirection() {

        const isRTL =
            document.documentElement.getAttribute("dir") === "rtl";

        document
            .querySelectorAll(".packup-about-hero-content")
            .forEach((content) => {

                content.style.direction = isRTL
                    ? "rtl"
                    : "ltr";

                content.style.textAlign = isRTL
                    ? "right"
                    : "left";

            });

    }

    syncAboutHeroDirection();


    /* =====================================================
       OBSERVE THE EXISTING THEME TOGGLE
    ===================================================== */

    const themeObserver = new MutationObserver(() => {
        syncAboutHeroTheme();
        renderAboutHeroIcons();
    });

    themeObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ["class"]
    });


    /* =====================================================
       OBSERVE THE EXISTING RTL TOGGLE
    ===================================================== */

    const directionObserver = new MutationObserver(() => {
        syncAboutHeroDirection();
    });

    directionObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["dir"]
    });

});