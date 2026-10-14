/* =========================================================
   CONTACT HERO - LUCIDE ICONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const contactHero = document.querySelector(
        ".packup-contact-hero"
    );

    if (!contactHero) return;

    if (window.lucide) {
        window.lucide.createIcons();
    }
});
/* =========================================================
   PACKUP CONTACT FORM
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("packupEnquiryForm");

    if (!form) return;

    const messageField = document.getElementById("packupMessage");
    const messageCount = document.getElementById("packupMessageCount");

    const enquiryType = document.getElementById("packupEnquiryType");
    const subjectField = document.getElementById("packupSubject");

    const submitButton = document.getElementById("packupSubmitButton");
    const statusMessage = document.getElementById("packupFormStatus");

    const fieldIds = [
        "packupFullName",
        "packupEmail",
        "packupPhone",
        "packupEnquiryType",
        "packupSubject",
        "packupMessage"
    ];

    /* =====================================================
       LUCIDE ICONS
    ===================================================== */

    if (window.lucide) {
        window.lucide.createIcons();
    }

    /* =====================================================
       MESSAGE CHARACTER COUNTER
    ===================================================== */

    function updateMessageCount() {
        messageCount.textContent =
            `${messageField.value.length} / 1000`;
    }

    messageField.addEventListener("input", updateMessageCount);

    /* =====================================================
       ENQUIRY TYPE -> SUBJECT SUGGESTION
    ===================================================== */

    const subjectSuggestions = {
        product: "Product Enquiry",
        order: "Order Support",
        warranty: "Warranty & Repair",
        store: "Store Visit Information",
        other: ""
    };

    enquiryType.addEventListener("change", () => {
        const suggestion = subjectSuggestions[enquiryType.value];

        if (suggestion && !subjectField.value.trim()) {
            subjectField.value = suggestion;
            clearFieldError(subjectField);
        }
    });

    /* =====================================================
       ERROR HELPERS
    ===================================================== */

    function getFieldWrapper(field) {
        return field.closest(".packup-contact-form-field");
    }

    function showFieldError(field, message) {
        const wrapper = getFieldWrapper(field);

        if (!wrapper) return;

        wrapper.classList.add("has-error");

        const error = wrapper.querySelector(
            ".packup-contact-form-error"
        );

        if (error) {
            error.textContent = message;
        }

        field.setAttribute("aria-invalid", "true");
    }

    function clearFieldError(field) {
        const wrapper = getFieldWrapper(field);

        if (!wrapper) return;

        wrapper.classList.remove("has-error");

        const error = wrapper.querySelector(
            ".packup-contact-form-error"
        );

        if (error) {
            error.textContent = "";
        }

        field.removeAttribute("aria-invalid");
    }

    function clearAllErrors() {
        fieldIds.forEach((id) => {
            const field = document.getElementById(id);

            if (field) clearFieldError(field);
        });
    }

    /* =====================================================
       VALIDATION
    ===================================================== */

    function validateForm() {
        clearAllErrors();

        let valid = true;

        const fullName = document.getElementById("packupFullName");
        const email = document.getElementById("packupEmail");
        const phone = document.getElementById("packupPhone");
        const subject = document.getElementById("packupSubject");
        const message = document.getElementById("packupMessage");

        if (fullName.value.trim().length < 2) {
            showFieldError(fullName, "Please enter your full name.");
            valid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email.value.trim())) {
            showFieldError(email, "Please enter a valid email address.");
            valid = false;
        }

        if (phone.value.trim()) {
            const phoneDigits = phone.value.replace(/\D/g, "");

            if (phoneDigits.length < 7 || phoneDigits.length > 15) {
                showFieldError(
                    phone,
                    "Please enter a valid phone number."
                );

                valid = false;
            }
        }

        if (!enquiryType.value) {
            showFieldError(enquiryType, "Please select an enquiry type.");
            valid = false;
        }

        if (subject.value.trim().length < 3) {
            showFieldError(subject, "Please enter a subject.");
            valid = false;
        }

        if (message.value.trim().length < 10) {
            showFieldError(
                message,
                "Please provide a little more detail (at least 10 characters)."
            );

            valid = false;
        }

        if (!valid) {
            const firstInvalid = form.querySelector("[aria-invalid='true']");

            if (firstInvalid) {
                firstInvalid.focus();
            }
        }

        return valid;
    }

    /* =====================================================
       CLEAR ERRORS AS USER EDITS
    ===================================================== */

    fieldIds.forEach((id) => {
        const field = document.getElementById(id);

        if (!field) return;

        const eventName =
            field.tagName === "SELECT" ? "change" : "input";

        field.addEventListener(eventName, () => {
            clearFieldError(field);
        });
    });

    /* =====================================================
       STATUS MESSAGE
    ===================================================== */

    function showStatus(message, type) {
        statusMessage.hidden = false;
        statusMessage.textContent = message;

        statusMessage.classList.remove("success", "error");
        statusMessage.classList.add(type);
    }

    /* =====================================================
       SUBMIT
    ===================================================== */

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        statusMessage.hidden = true;
        statusMessage.textContent = "";

        if (!validateForm()) {
            showStatus(
                "Please review the highlighted fields and try again.",
                "error"
            );

            return;
        }

        const enquiryData = {
            fullName: document.getElementById("packupFullName").value.trim(),
            email: document.getElementById("packupEmail").value.trim(),
            phone: document.getElementById("packupPhone").value.trim(),
            enquiryType: enquiryType.value,
            subject: subjectField.value.trim(),
            message: messageField.value.trim()
        };

        /*
         * Front-end validation is complete.
         *
         * To actually send the enquiry, connect this form to your
         * backend/API or a form-handling service.
         *
         * Do not display a successful submission message until
         * your backend confirms that the enquiry was received.
         */

        console.log("Validated Packup enquiry:", enquiryData);

        showStatus(
            "Your details are valid. Connect the form to your enquiry service to submit your message.",
            "success"
        );
    });

    updateMessageCount();

});

/* =========================================================
   PACKUP - VISIT OUR STORE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const section = document.querySelector(".packup-store-section");

    if (!section) return;

    /* Initialize Lucide icons */

    if (window.lucide) {
        window.lucide.createIcons();
    }

    const directionsButton = document.getElementById(
        "packupStoreDirections"
    );

    /*
       Replace this empty string with the verified store address
       before publishing the website.
    */

    const storeAddress = "";

    if (!directionsButton) return;

    directionsButton.addEventListener("click", (event) => {

        if (!storeAddress.trim()) {
            event.preventDefault();

            alert(
                "Store directions are not available yet. Please add the verified store address first."
            );

            return;
        }

        event.preventDefault();

        const directionsURL =
            "https://www.google.com/maps/dir/?api=1&destination=" +
            encodeURIComponent(storeAddress);

        window.open(
            directionsURL,
            "_blank",
            "noopener,noreferrer"
        );

    });

});
/* =====================================================
   SECTION 6 — LOCATION AND DIRECTIONS
===================================================== */
document.addEventListener("DOMContentLoaded", () => {

    /* Initialize Lucide icons */
    if (window.lucide) {
        window.lucide.createIcons();
    }

    const directionsButton = document.getElementById(
        "packup-location-directions"
    );

    if (!directionsButton) {
        return;
    }

    /*
       Current map destination:
       Charminar, Hyderabad

       Replace this with the verified Packup store address
       when the exact address is available.
    */

    const storeAddress = "Charminar, Hyderabad, India";

    directionsButton.addEventListener("click", (event) => {

        event.preventDefault();

        const verifiedAddress = storeAddress.trim();

        if (!verifiedAddress) {
            alert(
                "Please add the verified Packup store address before enabling directions."
            );
            return;
        }

        const mapsUrl =
            "https://www.google.com/maps/dir/?api=1&destination=" +
            encodeURIComponent(verifiedAddress);

        window.open(
            mapsUrl,
            "_blank",
            "noopener,noreferrer"
        );

    });

});