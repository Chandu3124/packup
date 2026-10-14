/* =========================================================
   PACKUP - PRIVACY POLICY PAGE JAVASCRIPT
   Theme + RTL handled by main.js
========================================================= */


document.addEventListener("DOMContentLoaded", function () {

    const body = document.body;
    const html = document.documentElement;

    const logo = document.querySelector(
        ".policy-brand-logo"
    );



    /* =========================================
       UPDATE LOGO ACCORDING TO THEME
    ========================================= */


    function updatePolicyLogo() {

        if (!logo) return;


        const isDark = body.classList.contains(
            "dark-mode"
        );


        const lightLogo = logo.getAttribute(
            "data-light-logo"
        );

        const darkLogo = logo.getAttribute(
            "data-dark-logo"
        );


        const selectedLogo = isDark
            ? darkLogo
            : lightLogo;


        if (
            selectedLogo &&
            logo.getAttribute("src") !== selectedLogo
        ) {
            logo.setAttribute(
                "src",
                selectedLogo
            );
        }
    }



    /* =========================================
       INITIALIZE LUCIDE ICONS
    ========================================= */


    function initializeIcons() {

        if (
            window.lucide &&
            typeof window.lucide.createIcons === "function"
        ) {
            window.lucide.createIcons();
        }
    }



    /* =========================================
       INITIAL PAGE SETUP
    ========================================= */


    updatePolicyLogo();
    initializeIcons();



    /* =========================================
       WATCH THEME CHANGES
    ========================================= */


    const themeObserver = new MutationObserver(
        function () {
            updatePolicyLogo();
        }
    );


    themeObserver.observe(body, {
        attributes: true,
        attributeFilter: ["class"]
    });



    /* =========================================
       WATCH RTL / LTR CHANGES
    ========================================= */


    const directionObserver = new MutationObserver(
        function () {
            initializeIcons();
        }
    );


    directionObserver.observe(html, {
        attributes: true,
        attributeFilter: ["dir"]
    });



    /* =========================================
       LOGO ERROR WARNING
    ========================================= */


    if (logo) {

        logo.addEventListener(
            "error",
            function () {
                console.warn(
                    "Packup logo could not be loaded. Check the logo file path."
                );
            }
        );
    }

});