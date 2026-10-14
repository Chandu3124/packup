/* =====================================================
   HOME 2 - TRAVEL BAG CAROUSEL
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const carousel = document.querySelector(
        ".packup-inspiration-carousel"
    );

    if (!carousel) return;

    const visual = document.querySelector(
        ".packup-inspiration-hero-visual"
    );

    const cards = Array.from(
        carousel.querySelectorAll(".packup-bag-card")
    );

    const previousButton = document.querySelector(
        ".packup-carousel-prev"
    );

    const nextButton = document.querySelector(
        ".packup-carousel-next"
    );

    const dots = Array.from(
        document.querySelectorAll(".packup-carousel-dot")
    );

    if (cards.length !== 3) return;

    let centerIndex = 1;
    let autoPlay = null;
    let isAnimating = false;

    const positions = [
        "packup-bag-card-left",
        "packup-bag-card-center",
        "packup-bag-card-right"
    ];

    function renderCarousel() {

        cards.forEach((card, index) => {

            card.classList.remove(...positions);

            const position =
                (index - centerIndex + cards.length) % cards.length;

            if (position === 0) {
                card.classList.add("packup-bag-card-center");
            } else if (position === 1) {
                card.classList.add("packup-bag-card-right");
            } else {
                card.classList.add("packup-bag-card-left");
            }

        });

        dots.forEach((dot, index) => {
            dot.classList.toggle(
                "is-active",
                index === centerIndex
            );
        });

        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    function moveCarousel(direction) {

        if (isAnimating) return;

        isAnimating = true;

        centerIndex =
            (centerIndex + direction + cards.length) % cards.length;

        renderCarousel();

        window.setTimeout(() => {
            isAnimating = false;
        }, 900);
    }

    function startAutoPlay() {

        stopAutoPlay();

        autoPlay = window.setInterval(() => {
            moveCarousel(1);
        }, 3500);
    }

    function stopAutoPlay() {

        if (autoPlay !== null) {
            window.clearInterval(autoPlay);
            autoPlay = null;
        }
    }

    if (nextButton) {
        nextButton.addEventListener("click", () => {
            moveCarousel(1);
            startAutoPlay();
        });
    }

    if (previousButton) {
        previousButton.addEventListener("click", () => {
            moveCarousel(-1);
            startAutoPlay();
        });
    }

    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            if (isAnimating || index === centerIndex) return;

            isAnimating = true;
            centerIndex = index;

            renderCarousel();

            window.setTimeout(() => {
                isAnimating = false;
            }, 900);

            startAutoPlay();
        });

    });

    /* Pause rotation while the user interacts with the cards */

    if (visual) {

        visual.addEventListener("mouseenter", stopAutoPlay);

        visual.addEventListener("mouseleave", startAutoPlay);

        visual.addEventListener("focusin", stopAutoPlay);

        visual.addEventListener("focusout", startAutoPlay);
    }

    /* Initial setup */

    renderCarousel();
    startAutoPlay();

});

/* =====================================================
   SECTION 2 — CHOOSE YOUR JOURNEY
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const journeySection = document.querySelector(
        ".packup-journey-section"
    );

    if (!journeySection) {
        return;
    }

    /* Initialize Lucide icons */
    if (window.lucide) {
        window.lucide.createIcons();
    }

    /* Keyboard focus state for category cards */
    const journeyCards = journeySection.querySelectorAll(
        ".packup-journey-card"
    );

    journeyCards.forEach((card) => {

        card.addEventListener("focus", () => {
            card.classList.add("is-focused");
        });

        card.addEventListener("blur", () => {
            card.classList.remove("is-focused");
        });

    });

});

/* =====================================================
   SECTION 3 — FIND YOUR PERFECT SIZE
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* Initialize Lucide icons */
    if (window.lucide) {
        window.lucide.createIcons();
    }

    /* Keyboard focus state for accessibility */
    const sizeCards = document.querySelectorAll(
        ".packup-size-card"
    );

    sizeCards.forEach((card) => {

        card.addEventListener("focusin", () => {
            card.classList.add("is-focused");
        });

        card.addEventListener("focusout", (event) => {

            if (!card.contains(event.relatedTarget)) {
                card.classList.remove("is-focused");
            }

        });

    });

});
/* =====================================================
   SECTION 4 — SMARTER PACKING
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const section = document.querySelector(
        ".packup-smart-section"
    );

    if (!section) {
        return;
    }

    /* Initialize Lucide icons */
    if (window.lucide) {
        window.lucide.createIcons();
    }

    /* Keyboard accessibility for feature rows */
    const features = section.querySelectorAll(
        ".packup-smart-feature"
    );

    features.forEach((feature) => {

        feature.setAttribute("tabindex", "0");

        feature.addEventListener("focus", () => {
            feature.classList.add("is-focused");
        });

        feature.addEventListener("blur", () => {
            feature.classList.remove("is-focused");
        });

    });

});

/* =====================================================
   SECTION 5 — MATERIALS ICONS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const materialsSection = document.querySelector(
        ".packup-materials-section"
    );

    if (!materialsSection) return;

    if (window.lucide) {
        window.lucide.createIcons();
    }
});

/* =====================================================
   PACKUP — CUSTOMER REVIEWS CAROUSEL
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const section = document.querySelector(".packup-reviews-section");

    if (!section) return;

    const viewport = section.querySelector(".packup-reviews-viewport");
    const track = section.querySelector("[data-review-track]");
    const cards = Array.from(
        section.querySelectorAll(".packup-review-card")
    );

    const prevButton = section.querySelector("[data-review-prev]");
    const nextButton = section.querySelector("[data-review-next]");
    const dotsContainer = section.querySelector("[data-review-dots]");
    const counter = section.querySelector("[data-review-counter]");

    if (
        !viewport ||
        !track ||
        !cards.length ||
        !prevButton ||
        !nextButton ||
        !dotsContainer ||
        !counter
    ) {
        return;
    }

    let currentIndex = 0;
    let maxIndex = 0;
    let resizeFrame = null;

    /* -----------------------------------------------
       VISIBLE CARDS
    ------------------------------------------------ */

    function getVisibleCards() {

        if (window.matchMedia("(max-width: 760px)").matches) {
            return 1;
        }

        if (window.matchMedia("(max-width: 1100px)").matches) {
            return 2;
        }

        return 3;
    }

    /* -----------------------------------------------
       CREATE PAGINATION DOTS
    ------------------------------------------------ */

    function createDots() {

        dotsContainer.replaceChildren();

        maxIndex = Math.max(
            0,
            cards.length - getVisibleCards()
        );

        for (let i = 0; i <= maxIndex; i++) {

            const dot = document.createElement("button");

            dot.type = "button";
            dot.className = "packup-reviews-dot";

            dot.setAttribute(
                "aria-label",
                `Show customer reviews starting at ${i + 1}`
            );

            dot.addEventListener("click", () => {
                currentIndex = i;
                updateCarousel();
            });

            dotsContainer.appendChild(dot);
        }

        currentIndex = Math.min(currentIndex, maxIndex);
    }

    /* -----------------------------------------------
       UPDATE CAROUSEL POSITION
    ------------------------------------------------ */

    function updateCarousel() {

        const firstCard = cards[0];

        if (!firstCard) return;

        const cardWidth = firstCard.getBoundingClientRect().width;

        const trackStyles = window.getComputedStyle(track);

        const gap = parseFloat(trackStyles.columnGap) || 0;

        const offset = currentIndex * (cardWidth + gap);

        track.style.transform = `translateX(-${offset}px)`;

        /* Previous / Next buttons */

        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex >= maxIndex;

        /* Active dots */

        const dots = dotsContainer.querySelectorAll(
            ".packup-reviews-dot"
        );

        dots.forEach((dot, index) => {

            const isActive = index === currentIndex;

            dot.classList.toggle("is-active", isActive);

            if (isActive) {
                dot.setAttribute("aria-current", "true");
            } else {
                dot.removeAttribute("aria-current");
            }
        });

        /* Review position counter */

        const current = String(currentIndex + 1).padStart(2, "0");
        const total = String(maxIndex + 1).padStart(2, "0");

        counter.textContent = `${current} / ${total}`;
    }

    /* -----------------------------------------------
       NAVIGATION
    ------------------------------------------------ */

    prevButton.addEventListener("click", () => {

        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }

    });

    nextButton.addEventListener("click", () => {

        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }

    });

    /* -----------------------------------------------
       RESPONSIVE RESIZE
    ------------------------------------------------ */

    function handleResize() {

        if (resizeFrame !== null) {
            cancelAnimationFrame(resizeFrame);
        }

        resizeFrame = requestAnimationFrame(() => {

            createDots();
            updateCarousel();

            resizeFrame = null;
        });
    }

    window.addEventListener("resize", handleResize);

    /* -----------------------------------------------
       INITIALIZE
    ------------------------------------------------ */

    createDots();
    updateCarousel();

});