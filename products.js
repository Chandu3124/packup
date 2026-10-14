/* =====================================================
   PRODUCTS HERO — LUCIDE ICONS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
    if (window.lucide) {
        window.lucide.createIcons();
    }
});
/* =====================================================
   PACKUP PRODUCT COLLECTION
   Cart, quantity, colour selection, sorting and details
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const section = document.querySelector(".packup-products-section");

    if (!section) return;

    const grid = document.getElementById("packupProductsGrid");
    const sortSelect = document.getElementById("packupProductSort");

    const cartDrawer = document.getElementById("packupCartDrawer");
    const cartBackdrop = document.getElementById("packupCartBackdrop");
    const cartItemsContainer = document.getElementById("packupCartItems");

    const cartCount = document.getElementById("packupCartCount");
    const cartSubtitle = document.getElementById("packupCartSubtitle");
    const cartSubtotal = document.getElementById("packupCartSubtotal");

    const openCartButton = document.getElementById("packupOpenCart");
    const closeCartButton = document.getElementById("packupCloseCart");
    const continueShoppingButton = document.getElementById("packupContinueShopping");
    const clearCartButton = document.getElementById("packupClearCart");
    const checkoutButton = document.getElementById("packupCheckout");

    const modalBackdrop = document.getElementById("packupProductModalBackdrop");
    const productModal = document.getElementById("packupProductModal");
    const closeModalButton = document.getElementById("packupCloseProductModal");

    const toast = document.getElementById("packupCartToast");
    const toastMessage = document.getElementById("packupCartToastMessage");

    const rupees = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    });

    /*
       Cart key = product ID + selected colour.
       Same product and colour increases quantity.
       Different colours are separate cart items.
    */

    const cart = new Map();

    let activeModalProduct = null;
    let toastTimer = null;
    let lastFocusedElement = null;

    /* =================================================
       LUCIDE
    ================================================= */

    function createIcons() {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    /* =================================================
       PRODUCT DATA
    ================================================= */

    function getProductData(card) {
        return {
            id: card.dataset.productId,
            name: card.dataset.name,
            price: Number(card.dataset.price),
            image: card.dataset.image,
            size: card.dataset.size,
            colours: (card.dataset.colours || "")
                .split(",")
                .map(colour => colour.trim())
                .filter(Boolean),
            features: (card.dataset.features || "")
                .split(",")
                .map(feature => feature.trim())
                .filter(Boolean),
            category: card.querySelector(".packup-product-category")
                ?.textContent.trim() || "TRAVEL COLLECTION"
        };
    }

    function getSelectedColour(card) {
        return card.querySelector(
            ".packup-product-swatch.is-selected"
        )?.dataset.colour || "Default";
    }

    /* =================================================
       TOAST
    ================================================= */

    function showToast(message) {
        toastMessage.textContent = message;
        toast.classList.add("is-visible");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {
            toast.classList.remove("is-visible");
        }, 2400);
    }

    /* =================================================
       COLOUR SELECTION
    ================================================= */

    grid.addEventListener("click", event => {
        const swatch = event.target.closest(".packup-product-swatch");

        if (!swatch) return;

        const card = swatch.closest(".packup-product-card");

        if (!card) return;

        card.querySelectorAll(".packup-product-swatch").forEach(button => {
            const selected = button === swatch;

            button.classList.toggle("is-selected", selected);
            button.setAttribute("aria-pressed", String(selected));
        });

        const selectedLabel = card.querySelector(
            ".packup-product-selected-colour"
        );

        if (selectedLabel) {
            selectedLabel.textContent = swatch.dataset.colour;
        }
    });

    /* =================================================
       ADD TO CART
    ================================================= */

    function addToCart(card) {
        if (!card) return;

        const product = getProductData(card);
        const colour = getSelectedColour(card);
        const key = `${product.id}::${colour}`;

        if (!Number.isFinite(product.price) || product.price < 0) {
            showToast("Product price is unavailable.");
            return;
        }

        if (cart.has(key)) {
            cart.get(key).quantity += 1;
        } else {
            cart.set(key, {
                ...product,
                colour,
                key,
                quantity: 1
            });
        }

        renderCart();

        showToast(`${product.name} added to your cart.`);
    }

    grid.addEventListener("click", event => {
        const addButton = event.target.closest("[data-add-cart]");

        if (addButton) {
            const card = addButton.closest(".packup-product-card");
            addToCart(card);
        }
    });

    /* =================================================
       RENDER CART
    ================================================= */

    function renderCart() {
        const items = Array.from(cart.values());

        const totalQuantity = items.reduce(
            (total, item) => total + item.quantity,
            0
        );

        const subtotal = items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );

        cartCount.textContent = totalQuantity;
        cartSubtitle.textContent =
            `${totalQuantity} ${totalQuantity === 1 ? "item" : "items"} selected`;

        cartSubtotal.textContent = rupees.format(subtotal);

        clearCartButton.disabled = items.length === 0;
        checkoutButton.disabled = items.length === 0;

        if (items.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="packup-cart-empty">
                    <span class="packup-cart-empty-icon">
                        <i data-lucide="shopping-bag"></i>
                    </span>
                    <h3>Your cart is waiting</h3>
                    <p>Add a bag you love and it will appear here.</p>
                    <button type="button"
                            class="packup-cart-continue"
                            id="packupContinueShopping">
                        Explore Bags
                    </button>
                </div>
            `;

            createIcons();
            return;
        }

        cartItemsContainer.innerHTML = items.map(item => `
            <div class="packup-cart-item" data-cart-key="${escapeHTML(item.key)}">

                <img
                    class="packup-cart-item-image"
                    src="${escapeHTML(item.image)}"
                    alt="${escapeHTML(item.name)}"
                >

                <div class="packup-cart-item-info">

                    <h3>${escapeHTML(item.name)}</h3>

                    <div class="packup-cart-item-colour">
                        Colour: ${escapeHTML(item.colour)}
                    </div>

                    <div class="packup-cart-item-price">
                        ${rupees.format(item.price * item.quantity)}
                    </div>

                    <div class="packup-cart-item-controls">

                        <button class="packup-cart-qty-button"
                                type="button"
                                data-cart-action="decrease"
                                data-key="${escapeHTML(item.key)}"
                                aria-label="Decrease quantity">
                            <i data-lucide="minus"></i>
                        </button>

                        <span class="packup-cart-qty">${item.quantity}</span>

                        <button class="packup-cart-qty-button"
                                type="button"
                                data-cart-action="increase"
                                data-key="${escapeHTML(item.key)}"
                                aria-label="Increase quantity">
                            <i data-lucide="plus"></i>
                        </button>

                    </div>

                </div>

                <button class="packup-cart-remove"
                        type="button"
                        data-cart-action="remove"
                        data-key="${escapeHTML(item.key)}"
                        aria-label="Remove ${escapeHTML(item.name)}">
                    <i data-lucide="trash-2"></i>
                </button>

            </div>
        `).join("");

        createIcons();
    }

    /* =================================================
       SAFE HTML ESCAPE
    ================================================= */

    function escapeHTML(value) {
        return String(value).replace(/[&<>"']/g, character => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[character]);
    }

    /* =================================================
       CART QUANTITY / REMOVE
    ================================================= */

    cartItemsContainer.addEventListener("click", event => {

        const button = event.target.closest("[data-cart-action]");

        if (!button) return;

        const key = button.dataset.key;
        const action = button.dataset.cartAction;
        const item = cart.get(key);

        if (!item) return;

        if (action === "increase") {
            item.quantity += 1;
        }

        if (action === "decrease") {
            item.quantity -= 1;

            if (item.quantity <= 0) {
                cart.delete(key);
            }
        }

        if (action === "remove") {
            cart.delete(key);
            showToast("Item removed from cart.");
        }

        renderCart();
    });

    /* =================================================
       CART DRAWER OPEN / CLOSE
    ================================================= */

    function openCart() {
        lastFocusedElement = document.activeElement;

        cartBackdrop.hidden = false;
        cartDrawer.inert = false;

        requestAnimationFrame(() => {
            cartDrawer.classList.add("is-open");
            cartDrawer.setAttribute("aria-hidden", "false");
            closeCartButton.focus();
        });

        document.body.style.overflow = "hidden";
    }

    function closeCart() {
        cartDrawer.classList.remove("is-open");
        cartDrawer.setAttribute("aria-hidden", "true");
        cartDrawer.inert = true;
        cartBackdrop.hidden = true;

        document.body.style.overflow = modalBackdrop.hidden ? "" : "hidden";

        if (lastFocusedElement?.isConnected) {
            lastFocusedElement.focus();
        }
    }

    openCartButton.addEventListener("click", openCart);
    closeCartButton.addEventListener("click", closeCart);
    cartBackdrop.addEventListener("click", closeCart);

    cartItemsContainer.addEventListener("click", event => {
        if (event.target.closest("#packupContinueShopping")) {
            closeCart();
        }
    });

    /* =================================================
       CLEAR CART
    ================================================= */

    clearCartButton.addEventListener("click", () => {
        if (!cart.size) return;

        cart.clear();
        renderCart();
        showToast("Your cart has been cleared.");
    });

    /* =================================================
       VIEW PRODUCT DETAILS
    ================================================= */

    function openProductDetails(card) {
        if (!card) return;

        const product = getProductData(card);

        activeModalProduct = card;
        lastFocusedElement = document.activeElement;

        document.getElementById("packupModalImage").src = product.image;
        document.getElementById("packupModalImage").alt = product.name;

        document.getElementById("packupModalCategory").textContent =
            product.category;

        document.getElementById("packupModalTitle").textContent =
            product.name;

        document.getElementById("packupModalPrice").textContent =
            rupees.format(product.price);

        document.getElementById("packupModalSize").textContent =
            product.size;

        const selectedColour = getSelectedColour(card);

        document.getElementById("packupModalColours").innerHTML =
            product.colours.map(colour => `
                <span class="packup-modal-colour ${
                    colour === selectedColour ? "is-selected" : ""
                }">
                    ${escapeHTML(colour)}
                </span>
            `).join("");

        document.getElementById("packupModalFeatures").innerHTML =
            product.features.map(feature => `
                <li>${escapeHTML(feature)}</li>
            `).join("");

        modalBackdrop.hidden = false;

        requestAnimationFrame(() => {
            productModal.focus();
        });

        document.body.style.overflow = "hidden";
    }

    function closeProductDetails() {
        modalBackdrop.hidden = true;
        activeModalProduct = null;

        document.body.style.overflow =
            cartDrawer.classList.contains("is-open") ? "hidden" : "";

        if (lastFocusedElement?.isConnected) {
            lastFocusedElement.focus();
        }
    }

    grid.addEventListener("click", event => {
        const viewButton = event.target.closest("[data-view-product]");

        if (!viewButton) return;

        openProductDetails(
            viewButton.closest(".packup-product-card")
        );
    });

    closeModalButton.addEventListener("click", closeProductDetails);

    modalBackdrop.addEventListener("click", event => {
        if (event.target === modalBackdrop) {
            closeProductDetails();
        }
    });

    document.getElementById("packupModalAddCart").addEventListener("click", () => {
        if (!activeModalProduct) return;

        addToCart(activeModalProduct);
        closeProductDetails();
        openCart();
    });

    /* =================================================
       SORT PRODUCTS
    ================================================= */

    sortSelect.addEventListener("change", () => {
        const cards = Array.from(
            grid.querySelectorAll(".packup-product-card")
        );

        const sortMode = sortSelect.value;

        cards.sort((a, b) => {
            const productA = getProductData(a);
            const productB = getProductData(b);

            if (sortMode === "price-low") {
                return productA.price - productB.price;
            }

            if (sortMode === "price-high") {
                return productB.price - productA.price;
            }

            if (sortMode === "name") {
                return productA.name.localeCompare(productB.name);
            }

            return Number(a.dataset.productId === "voyager-28") * -1;
        });

        cards.forEach(card => grid.appendChild(card));
    });

    /* =================================================
       CHECKOUT PLACEHOLDER
    ================================================= */

    checkoutButton.addEventListener("click", () => {
        if (!cart.size) return;

        showToast("Connect your checkout or payment flow to continue.");
    });

    /* =================================================
       KEYBOARD SUPPORT
    ================================================= */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            if (!modalBackdrop.hidden) {
                closeProductDetails();
            } else if (cartDrawer.classList.contains("is-open")) {
                closeCart();
            }
        }

    });

    /* =================================================
       INITIAL RENDER
    ================================================= */

    renderCart();
    createIcons();

});
document.addEventListener("DOMContentLoaded", () => {

    const sizeOptions = document.querySelectorAll(
        ".packup-size-option"
    );

    const sizeImage = document.getElementById(
        "packup-size-image"
    );

    const sizeIndex = document.getElementById(
        "packup-size-index"
    );

    const sizeKicker = document.getElementById(
        "packup-size-kicker"
    );

    const sizeTitle = document.getElementById(
        "packup-size-image-title"
    );

    const sizeDescription = document.getElementById(
        "packup-size-image-description"
    );

    const sizeDimensions = document.getElementById(
        "packup-size-dimensions"
    );

    const sizeCapacity = document.getElementById(
        "packup-size-capacity"
    );

    const sizePurpose = document.getElementById(
        "packup-size-purpose"
    );

    const sizePanel = document.getElementById(
        "size-panel"
    );


    if (
        !sizeOptions.length ||
        !sizeImage ||
        !sizePanel
    ) {
        return;
    }


    const sizeData = {

        cabin: {
            index: "01 / 04",
            kicker: "LIGHT TRAVEL",
            title: "Cabin Luggage",
            description:
                "Smart packing for short trips and quick getaways.",
            image:
                "https://images.openai.com/static-rsc-4/ELjM00vJsRmMei2K5iwjzU4RVuai4b0DoYXCiJ7uee77m_bGtP-86Tz0gBkprVMnO-1zvgRROQhC9iaK9mq3KIOXyBofU6RrPc9s2-EgxroSuHq3ITPuAX-rWMFgFFWFfIDrpmiyRYie0Qfwe2PAfr8w4Ed5wa5fvd0HYdlM9B0hC2TgsIDXJMNvpRt6THGK?purpose=fullsize",
            alt: "Cabin luggage suitcase",
            dimensions: "55 × 35 × 23 cm",
            capacity: "35–40 litres",
            purpose: "Short trips"
        },

        medium: {
            index: "02 / 04",
            kicker: "BALANCED SPACE",
            title: "Medium Suitcases",
            description:
                "A practical balance of packing space and portability.",
            image:
                "https://images.openai.com/static-rsc-4/k945dLwE4RDo9ou_xn_1SgWlqm9uOQQTe5O-AlrZLGbtbbQOzVWZPktgz97IOki63n_SPLaceWRo40KtG7aZntD9y1b3evGh1nr-ecT0ghMc9Zblk_9LeXx9pGCVOUA1npBB01kpStvwXTq0S_EGssluEjs53eu1Kbq-qkCHDN4AodBFG1gokWd4ShgVr3Dx?purpose=fullsize",
            alt: "Travel bag for medium-length journeys",
            dimensions: "65 × 45 × 28 cm",
            capacity: "60–70 litres",
            purpose: "Week-long trips"
        },

        large: {
            index: "03 / 04",
            kicker: "EXTRA CAPACITY",
            title: "Large Suitcases",
            description:
                "More room for extended trips and additional essentials.",
            image:
                "https://images.openai.com/static-rsc-4/mLQTuTGHzDInuhU94jO2TBIjyIRIkC3dls4oEjiVtrJ8BK0e9nZzbIFG-ExeNveRpjsld3fJ4vKTmHBGiDkJiaeEWN05Jq_W0kU31RgPFQ6Q1doXMpthW4VJJ68f7g9q6qVM9-exzNb2DQn02adztAfU5fnXzDCjO5SwolHezf5UAgPlNBrPoOHDTRrGpUY8?purpose=fullsize",
            alt: "Large travel luggage",
            dimensions: "75 × 50 × 30 cm",
            capacity: "90–110 litres",
            purpose: "Extended travel"
        },

        sets: {
            index: "04 / 04",
            kicker: "TRAVEL TOGETHER",
            title: "Multi-Piece Sets",
            description:
                "A coordinated collection of bags for different journeys.",
            image:
                "https://images.openai.com/static-rsc-4/jgJX4ThIKNvP39HGNsHBL0f7EVUCz1OTskLTCKhORUBS-PgSvqjpQx95-YJ1A2heRh1LhAANDQwE0wXTBkjTg_NLUCtD2KQmnAr-7dOiaaEdL3XYquLUVl9FzlrpIOFymD18b6LrtYGb7lUSQMVSnOTfclSQEHF_VFokRmkN4dyeRmr4s6IheP_R6dkGSw9C?purpose=fullsize",
            alt: "Multiple travel bags for different needs",
            dimensions: "Multiple sizes",
            capacity: "Varies by set",
            purpose: "Flexible travel"
        }

    };


    function selectSize(option, moveFocus = false) {

        const selectedSize = option.dataset.size;
        const data = sizeData[selectedSize];

        if (!data) {
            return;
        }


        sizeOptions.forEach((item) => {

            const isActive = item === option;

            item.classList.toggle("active", isActive);

            item.setAttribute(
                "aria-selected",
                String(isActive)
            );

            item.tabIndex = isActive ? 0 : -1;

        });


        if (moveFocus) {
            option.focus();
        }


        sizePanel.setAttribute(
            "aria-labelledby",
            option.id
        );


        sizeImage.style.opacity = "0.45";

        const newImage = new Image();

        newImage.onload = () => {

            sizeImage.src = data.image;
            sizeImage.alt = data.alt;
            sizeImage.style.opacity = "1";

        };

        newImage.onerror = () => {

            sizeImage.style.opacity = "1";

        };

        newImage.src = data.image;


        sizeIndex.textContent = data.index;
        sizeKicker.textContent = data.kicker;
        sizeTitle.textContent = data.title;
        sizeDescription.textContent = data.description;
        sizeDimensions.textContent = data.dimensions;
        sizeCapacity.textContent = data.capacity;
        sizePurpose.textContent = data.purpose;


        if (window.lucide) {
            window.lucide.createIcons();
        }

    }


    sizeOptions.forEach((option, index) => {

        option.addEventListener("click", () => {
            selectSize(option);
        });


        option.addEventListener("keydown", (event) => {

            let nextIndex = index;

            if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                event.preventDefault();
                nextIndex = (index + 1) % sizeOptions.length;
            }

            else if (
                event.key === "ArrowUp" ||
                event.key === "ArrowLeft"
            ) {
                event.preventDefault();
                nextIndex =
                    (index - 1 + sizeOptions.length) %
                    sizeOptions.length;
            }

            else if (event.key === "Home") {
                event.preventDefault();
                nextIndex = 0;
            }

            else if (event.key === "End") {
                event.preventDefault();
                nextIndex = sizeOptions.length - 1;
            }

            else {
                return;
            }

            selectSize(sizeOptions[nextIndex], true);

        });

    });


    const initialOption = document.querySelector(
        ".packup-size-option.active"
    ) || sizeOptions[0];

    selectSize(initialOption);


    if (window.lucide) {
        window.lucide.createIcons();
    }

});