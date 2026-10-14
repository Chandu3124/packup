/* =====================================================
   PACKUP — WARRANTY HERO INITIALIZATION
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const hero = document.querySelector(".packup-warranty-hero");

    if (!hero) {
        return;
    }

    // Initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Smooth scroll to warranty and repair sections
    hero.querySelectorAll('a[href^="#"]').forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        });

    });

});
/* =====================================================
   PACKUP — WARRANTY INFORMATION
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const section = document.querySelector(
        ".packup-coverage-section"
    );

    if (!section) {
        return;
    }

    // Initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

});

/* =====================================================
   PACKUP — REPAIR SERVICES
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const section = document.querySelector(
        ".packup-repair-section"
    );

    if (!section) {
        return;
    }

    if (window.lucide) {
        window.lucide.createIcons();
    }

});
document.addEventListener("DOMContentLoaded", () => {
    const processSection = document.querySelector(
        ".packup-process-section"
    );

    if (!processSection) return;

    if (window.lucide) {
        window.lucide.createIcons();
    }
});

document.addEventListener("DOMContentLoaded", () => {

    const section = document.querySelector(
        ".packup-prepare-section"
    );

    if (!section) return;

    const checkboxes = section.querySelectorAll(
        ".packup-prepare-checkbox"
    );

    const count = section.querySelector(
        "#packupPrepareCount"
    );

    const progress = section.querySelector(
        "#packupPrepareProgress"
    );

    const progressFill = section.querySelector(
        "#packupPrepareProgressFill"
    );

    const completeMessage = section.querySelector(
        "#packupPrepareComplete"
    );

    const totalItems = checkboxes.length;

    function updatePreparationProgress() {

        const checkedItems = section.querySelectorAll(
            ".packup-prepare-checkbox:checked"
        ).length;

        const percentage = totalItems > 0
            ? (checkedItems / totalItems) * 100
            : 0;

        count.textContent = `${checkedItems}/${totalItems}`;

        progressFill.style.width = `${percentage}%`;

        progress.setAttribute(
            "aria-valuenow",
            checkedItems
        );

        completeMessage.hidden = checkedItems !== totalItems;
    }

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener(
            "change",
            updatePreparationProgress
        );
    });

    updatePreparationProgress();

    if (window.lucide) {
        window.lucide.createIcons();
    }

});

document.addEventListener("DOMContentLoaded", () => {

    const careSection = document.querySelector(
        ".packup-care-section"
    );

    if (!careSection) return;

    if (window.lucide) {
        window.lucide.createIcons();
    }

});

/* =========================================================
   REPAIR ENQUIRY CTA - LUCIDE ICONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const repairCTA = document.querySelector(
        ".packup-repair-cta-section"
    );

    if (!repairCTA) return;

    if (window.lucide) {
        window.lucide.createIcons();
    }
});