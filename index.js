/* =====================================================
   PACKUP HERO — JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const hero = document.querySelector(".packup-hero");

    if (!hero) {
        return;
    }

    /* ---------------------------------------------
       LUCIDE ICONS
    --------------------------------------------- */

    function renderHeroIcons() {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    renderHeroIcons();


    /* ---------------------------------------------
       RTL SUPPORT
       Supports html dir="rtl" and body.rtl
    --------------------------------------------- */

    function updateHeroDirection() {

        const htmlDirection =
            document.documentElement.getAttribute("dir");

        const bodyRTL =
            document.body.classList.contains("rtl");

        const isRTL =
            htmlDirection === "rtl" || bodyRTL;

        hero.classList.toggle("packup-hero-rtl", isRTL);

    }

    updateHeroDirection();


    /* ---------------------------------------------
       WATCH FOR RTL / THEME CHANGES
       Works with existing theme toggle scripts
    --------------------------------------------- */

    const observer = new MutationObserver(() => {
        updateHeroDirection();
        renderHeroIcons();
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["dir", "class"]
    });

    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ["class"]
    });


    /* ---------------------------------------------
       BUTTON FEEDBACK
       Navigation uses the links' href values
    --------------------------------------------- */

    const heroButtons =
        hero.querySelectorAll(".packup-hero-btn");

    heroButtons.forEach((button) => {

        button.addEventListener("click", (event) => {

            const destination = button.getAttribute("href");

            if (!destination || destination === "#") {
                event.preventDefault();
            }

        });

    });

});

/* =====================================================
   PACKUP BESTSELLERS — JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const section = document.querySelector(".packup-bestsellers");

    if (!section) {
        return;
    }

    /* Initialize Lucide icons */
    if (window.lucide) {
        window.lucide.createIcons();
    }

    /* Image fallback */
    const productImages = section.querySelectorAll(
        ".packup-product-image img"
    );

    productImages.forEach((image) => {

        const showFallback = () => {

            const imageContainer = image.closest(
                ".packup-product-image"
            );

            if (!imageContainer) {
                return;
            }

            image.style.display = "none";

            imageContainer.classList.add(
                "packup-product-image-fallback"
            );

            if (
                !imageContainer.querySelector(
                    ".packup-image-fallback-text"
                )
            ) {

                const fallback = document.createElement("div");

                fallback.className = "packup-image-fallback-text";

                fallback.textContent = "Travel Collection";

                imageContainer.appendChild(fallback);
            }

        };

        image.addEventListener("error", showFallback);

        if (image.complete && image.naturalWidth === 0) {
            showFallback();
        }

    });

});


document.addEventListener("DOMContentLoaded", () => {
    const exploreSection = document.querySelector(".packup-explore");

    if (!exploreSection) return;

    // Render Lucide icons if the library is already loaded.
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Fallback if an image URL fails to load.
    exploreSection.querySelectorAll(".packup-category-image img").forEach((image) => {
        image.addEventListener("error", () => {
            image.style.visibility = "hidden";
            image.parentElement.classList.add("packup-image-fallback");
        }, { once: true });
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector(".packup-better-travel");

    if (!section) return;

    // Initialize Lucide icons if available.
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Handle failed image loading gracefully.
    const image = section.querySelector(".packup-better-image-wrap img");

    if (image) {
        image.addEventListener("error", () => {
            image.style.display = "none";
            image.parentElement.classList.add("packup-better-image-fallback");
        }, { once: true });
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector(".packup-journey");

    if (!section) return;

    // Initialize Lucide icons if already included in the project.
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Respect the user's reduced-motion preference.
    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
        section.classList.add("packup-journey-reduced-motion");
    }

    // Optional: expose the selected journey category through the URL.
    section.querySelectorAll(".packup-journey-card").forEach((card) => {
        card.addEventListener("click", () => {
            const url = new URL(card.href, window.location.href);
            const journey = url.searchParams.get("journey");

            if (journey) {
                section.dataset.selectedJourney = journey;
            }
        });
    });
});
/* =========================================================
   SECTION 6 — LUCIDE ICONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    if (window.lucide) {
        window.lucide.createIcons();
    }

});
/* =====================================================
   PACKUP HOME — CUSTOMER REVIEWS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const section = document.querySelector(".packup-home-reviews");

    if (!section) return;

    /* Initialize Lucide only if needed */
    if (window.lucide) {
        window.lucide.createIcons();
    }

    /* Small card entrance effect */
    const cards = section.querySelectorAll(
        ".packup-home-review-card, .packup-home-review-featured"
    );

    cards.forEach((card) => {

        card.addEventListener("pointerenter", () => {
            card.classList.add("is-interacting");
        });

        card.addEventListener("pointerleave", () => {
            card.classList.remove("is-interacting");
        });

    });

});