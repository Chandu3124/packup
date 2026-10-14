/* =========================================================
   PACKUP - HEADER + FOOTER JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    applySavedPreferences();
    createLucideIcons();
    initializeNavbar();
    initializeBackToTop();
});

/* =========================================================
   LUCIDE ICONS
========================================================= */

function createLucideIcons(root = document) {
    if (typeof lucide !== "undefined") {
        lucide.createIcons({
            root: root
        });
    }
}

function setLucideIcon(element, iconName) {
    if (!element) return;
    element.replaceChildren();
    const icon = document.createElement("i");
    icon.setAttribute(
        "data-lucide",
        iconName
    );
    element.appendChild(icon);
    createLucideIcons(element);
}

/* =========================================================
   LOCAL STORAGE
========================================================= */

function getStorageItem(key, fallback = null) {
    try {
        const value = localStorage.getItem(key);
        return value !== null
            ? value
            : fallback;
    } catch {
        return fallback;
    }
}

function setStorageItem(key, value) {
    try {
        localStorage.setItem(
            key,
            value
        );
    } catch {}
}

/* =========================================================
   SAVED PREFERENCES
========================================================= */

function applySavedPreferences() {
    const savedTheme =
        getStorageItem(
            "theme",
            "light"
        );

    const savedDirection =
        getStorageItem(
            "direction",
            "ltr"
        );

    /* DARK MODE */
    document.body.classList.toggle(
        "dark-mode",
        savedTheme === "dark"
    );

    /* RTL */
    applyDirection(
        savedDirection === "rtl"
            ? "rtl"
            : "ltr",
        false
    );

    updateThemeLogos();
}

/* =========================================================
   RTL / LTR
========================================================= */

function applyDirection(
    direction,
    save = true
) {
    const finalDirection =
        direction === "rtl"
            ? "rtl"
            : "ltr";

    /*
       Apply direction to HTML
    */
    document.documentElement.setAttribute(
        "dir",
        finalDirection
    );

    /*
       Apply direction to BODY
    */
    document.body.setAttribute(
        "dir",
        finalDirection
    );

    /*
       Update language
    */
    document.documentElement.setAttribute(
        "lang",
        finalDirection === "rtl"
            ? "ar"
            : "en"
    );

    /*
       Save direction
    */
    if (save) {
        setStorageItem(
            "direction",
            finalDirection
        );
    }

    /*
       Close dropdown when direction changes
    */
    closeAllDropdowns();

    /*
       Update RTL button
    */
    updateToggleIcons();
}

/* =========================================================
   THEME LOGOS
========================================================= */

function updateThemeLogos() {
    const isDark =
        document.body.classList.contains(
            "dark-mode"
        );

    document
        .querySelectorAll(
            "[data-light-logo][data-dark-logo]"
        )
        .forEach((logo) => {
            logo.src =
                isDark
                    ? logo.dataset.darkLogo
                    : logo.dataset.lightLogo;
        });

    const logoPath =
        isDark
            ? "logo_dark.png"
            : "logo_light.png";

    const favicon =
        document.querySelector(
            'link[rel="icon"]'
        );

    const appleIcon =
        document.querySelector(
            'link[rel="apple-touch-icon"]'
        );

    if (favicon) {
        favicon.href = logoPath;
    }

    if (appleIcon) {
        appleIcon.href = logoPath;
    }
}

/* =========================================================
   NAVBAR
========================================================= */

function initializeNavbar() {
    const darkToggle =
        document.getElementById(
            "darkToggle"
        );

    const rtlToggle =
        document.getElementById(
            "rtlToggle"
        );

    const menuToggle =
        document.getElementById(
            "menuToggle"
        );

    const navLinks =
        document.querySelector(
            ".nav-links"
        );

    const mobileAction =
        document.querySelector(
            ".mobile-action"
        );

    const dropdowns =
        document.querySelectorAll(
            ".dropdown"
        );

    setActiveNavLink();
    updateToggleIcons();

    if (darkToggle) {
        setupDarkMode(
            darkToggle
        );
    }

    if (rtlToggle) {
        setupRTL(
            rtlToggle
        );
    }

    if (
        menuToggle &&
        navLinks
    ) {
        setupMobileMenu(
            menuToggle,
            navLinks,
            mobileAction,
            dropdowns
        );
    }

    setupMobileDropdowns(
        dropdowns
    );
}

/* =========================================================
   TOGGLE ICONS
========================================================= */

function updateToggleIcons() {
    const darkToggle =
        document.getElementById(
            "darkToggle"
        );

    const rtlToggle =
        document.getElementById(
            "rtlToggle"
        );

    const menuToggle =
        document.getElementById(
            "menuToggle"
        );

    const navLinks =
        document.querySelector(
            ".nav-links"
        );

    /* DARK MODE */
    if (darkToggle) {
        const isDark =
            document.body.classList.contains(
                "dark-mode"
            );

        setLucideIcon(
            darkToggle,
            isDark
                ? "sun"
                : "moon"
        );

        darkToggle.title =
            isDark
                ? "Light Mode"
                : "Dark Mode";

        darkToggle.setAttribute(
            "aria-label",
            isDark
                ? "Switch to light mode"
                : "Switch to dark mode"
        );

        darkToggle.setAttribute(
            "aria-pressed",
            String(isDark)
        );
    }

    /* RTL */
    if (rtlToggle) {
        const isRTL =
            document.documentElement.getAttribute(
                "dir"
            ) === "rtl";

        rtlToggle.title =
            isRTL
                ? "LTR Mode"
                : "RTL Mode";

        rtlToggle.setAttribute(
            "aria-label",
            isRTL
                ? "Switch to left-to-right mode"
                : "Switch to right-to-left mode"
        );

        rtlToggle.setAttribute(
            "aria-pressed",
            String(isRTL)
        );
    }

    /* MOBILE MENU */
    if (menuToggle) {
        const isOpen =
            navLinks?.classList.contains(
                "active"
            ) || false;

        setLucideIcon(
            menuToggle,
            isOpen
                ? "x"
                : "menu"
        );

        menuToggle.title =
            isOpen
                ? "Close Menu"
                : "Open Menu";

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close menu"
                : "Open menu"
        );

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );
    }
}

/* =========================================================
   DARK MODE
========================================================= */

function setupDarkMode(
    darkToggle
) {
    darkToggle.addEventListener(
        "click",
        () => {
            const isDark =
                document.body.classList.toggle(
                    "dark-mode"
                );

            setStorageItem(
                "theme",
                isDark
                    ? "dark"
                    : "light"
            );

            updateThemeLogos();
            updateToggleIcons();
        }
    );
}

/* =========================================================
   RTL TOGGLE
========================================================= */

function setupRTL(
    rtlToggle
) {
    rtlToggle.addEventListener(
        "click",
        () => {
            const currentDirection =
                document.documentElement.getAttribute(
                    "dir"
                ) || "ltr";

            const newDirection =
                currentDirection === "rtl"
                    ? "ltr"
                    : "rtl";

            applyDirection(
                newDirection,
                true
            );
        }
    );
}

/* =========================================================
   MOBILE MENU - CENTERED OVERLAY
========================================================= */

function setupMobileMenu(
    menuToggle,
    navLinks,
    mobileAction,
    dropdowns
) {
    /* Toggle menu on button click */
    menuToggle.addEventListener(
        "click",
        (event) => {
            event.stopPropagation();
            const isOpen =
                navLinks.classList.toggle(
                    "active"
                );

            mobileAction?.classList.toggle(
                "active",
                isOpen
            );

            updateToggleIcons();
        }
    );

    /* Prevent closing when clicking inside menu */
    navLinks.addEventListener(
        "click",
        (event) => {
            event.stopPropagation();

            const clickedLink =
                event.target.closest("a");

            if (!clickedLink) return;

            const parentDropdown =
                clickedLink.closest(
                    ".dropdown"
                );

            const dropdownTrigger =
                parentDropdown?.querySelector(
                    ":scope > .dropdown-trigger"
                );

            /*
               Don't close menu when
               clicking Home dropdown
            */
            if (
                window.innerWidth <= 1024 &&
                parentDropdown &&
                clickedLink === dropdownTrigger
            ) {
                return;
            }

            if (
                window.innerWidth <= 1024
            ) {
                closeMobileMenu(
                    menuToggle,
                    navLinks,
                    mobileAction,
                    dropdowns
                );
            }
        }
    );

    /* Close when clicking CTA button */
    mobileAction?.addEventListener(
        "click",
        (event) => {
            if (
                event.target.closest("a") &&
                window.innerWidth <= 1024
            ) {
                closeMobileMenu(
                    menuToggle,
                    navLinks,
                    mobileAction,
                    dropdowns
                );
            }
        }
    );

    /* Close when clicking outside (anywhere on screen) */
    document.addEventListener(
        "click",
        (event) => {
            if (
                window.innerWidth <= 1024 &&
                navLinks.classList.contains(
                    "active"
                ) &&
                !navLinks.contains(
                    event.target
                ) &&
                !menuToggle.contains(
                    event.target
                )
            ) {
                closeMobileMenu(
                    menuToggle,
                    navLinks,
                    mobileAction,
                    dropdowns
                );
            }
        }
    );

    /* Escape key */
    document.addEventListener(
        "keydown",
        (event) => {
            if (
                event.key === "Escape" &&
                navLinks.classList.contains(
                    "active"
                )
            ) {
                closeMobileMenu(
                    menuToggle,
                    navLinks,
                    mobileAction,
                    dropdowns
                );

                menuToggle.focus();
            }
        }
    );

    /* Resize */
    window.addEventListener(
        "resize",
        () => {
            if (
                window.innerWidth > 1024
            ) {
                closeMobileMenu(
                    menuToggle,
                    navLinks,
                    mobileAction,
                    dropdowns
                );
            }
        }
    );
}

/* =========================================================
   CLOSE MOBILE MENU
========================================================= */

function closeMobileMenu(
    menuToggle,
    navLinks,
    mobileAction,
    dropdowns
) {
    navLinks?.classList.remove(
        "active"
    );

    mobileAction?.classList.remove(
        "active"
    );

    dropdowns.forEach(
        (dropdown) => {
            dropdown.classList.remove(
                "active"
            );

            dropdown
                .querySelector(
                    ":scope > .dropdown-trigger"
                )
                ?.setAttribute(
                    "aria-expanded",
                    "false"
                );
        }
    );

    updateToggleIcons();
}

/* =========================================================
   MOBILE DROPDOWN
========================================================= */

function setupMobileDropdowns(
    dropdowns
) {
    dropdowns.forEach(
        (dropdown) => {
            const trigger =
                dropdown.querySelector(
                    ":scope > .dropdown-trigger"
                );

            const dropdownMenu =
                dropdown.querySelector(
                    ".dropdown-menu"
                );

            if (
                !trigger ||
                !dropdownMenu
            ) {
                return;
            }

            trigger.setAttribute(
                "aria-expanded",
                "false"
            );

            trigger.addEventListener(
                "click",
                (event) => {
                    event.stopPropagation();

                    if (
                        window.innerWidth > 1024
                    ) {
                        return;
                    }

                    event.preventDefault();

                    dropdowns.forEach(
                        (otherDropdown) => {
                            if (
                                otherDropdown !==
                                dropdown
                            ) {
                                otherDropdown.classList.remove(
                                    "active"
                                );

                                otherDropdown
                                    .querySelector(
                                        ":scope > .dropdown-trigger"
                                    )
                                    ?.setAttribute(
                                        "aria-expanded",
                                        "false"
                                    );
                            }
                        }
                    );

                    const isOpen =
                        dropdown.classList.toggle(
                            "active"
                        );

                    trigger.setAttribute(
                        "aria-expanded",
                        String(isOpen)
                    );
                }
            );
        }
    );
}

/* =========================================================
   CLOSE ALL DROPDOWNS
========================================================= */

function closeAllDropdowns() {
    document
        .querySelectorAll(
            ".dropdown"
        )
        .forEach(
            (dropdown) => {
                dropdown.classList.remove(
                    "active"
                );

                dropdown
                    .querySelector(
                        ":scope > .dropdown-trigger"
                    )
                    ?.setAttribute(
                        "aria-expanded",
                        "false"
                    );
            }
        );
}

/* =========================================================
   ACTIVE NAV LINK
========================================================= */

function setActiveNavLink() {
    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase()
        || "index.html";

    const links =
        document.querySelectorAll(
            ".nav-links a"
        );

    links.forEach(
        (link) => {
            link.classList.remove(
                "active"
            );

            link.removeAttribute(
                "aria-current"
            );
        }
    );

    const homeDropdown =
        document.querySelector(
            ".nav-links .dropdown"
        );

    const homeTrigger =
        homeDropdown?.querySelector(
            ":scope > .dropdown-trigger"
        );

    if (
        [
            "index.html",
            "home2.html",
            ""
        ].includes(currentPage)
    ) {
        homeTrigger?.classList.add(
            "active"
        );

        homeTrigger?.setAttribute(
            "aria-current",
            "page"
        );

        return;
    }

    links.forEach(
        (link) => {
            const href =
                link.getAttribute(
                    "href"
                );

            if (
                !href ||
                href === "#" ||
                href.startsWith(
                    "javascript:"
                )
            ) {
                return;
            }

            const linkPage =
                new URL(
                    link.href,
                    window.location.href
                )
                    .pathname
                    .split("/")
                    .pop()
                    .toLowerCase();

            if (
                linkPage === currentPage
            ) {
                link.classList.add(
                    "active"
                );

                link.setAttribute(
                    "aria-current",
                    "page"
                );
            }
        }
    );
}

/* =========================================================
   BACK TO TOP
========================================================= */

function initializeBackToTop() {
    const topButton =
        document.querySelector(
            ".top-btn"
        );

    if (!topButton) return;

    topButton.addEventListener(
        "click",
        (event) => {
            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    );
}