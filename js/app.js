// ======================================================
// SH GLOBAL TECHNOLOGY (SHGT-v2.0)
// FINAL APP.JS - PART 1
// ======================================================

import {
    db
} from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// ======================================================
// DOM
// ======================================================

const loader = document.getElementById("loader");

const menuToggle = document.querySelector(".menu-toggle");

const navMenu = document.querySelector(".nav-menu");

const backToTop = document.getElementById("backToTop");

const productContainer = document.getElementById("productContainer");

const searchInput = document.getElementById("searchInput");

const brandButtons = document.querySelectorAll(".brand-btn");

// ======================================================
// GLOBAL
// ======================================================

let products = [];

let filteredProducts = [];

// ======================================================
// LOADER
// ======================================================

window.addEventListener("load", () => {

    if (loader) {

        setTimeout(() => {

            loader.style.opacity = "0";

            loader.style.visibility = "hidden";

        }, 800);

    }

});

// ======================================================
// MOBILE MENU
// ======================================================

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");

    });

}

// ======================================================
// CLOSE MENU
// ======================================================

document.querySelectorAll(".nav-menu a").forEach(link => {

    link.addEventListener("click", () => {

        if (navMenu) {

            navMenu.classList.remove("active");

        }

    });

});

// ======================================================
// BACK TO TOP
// ======================================================

window.addEventListener("scroll", () => {

    if (!backToTop) return;

    if (window.scrollY > 400) {

        backToTop.style.display = "flex";

    } else {

        backToTop.style.display = "none";

    }

});

if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

// ======================================================
// LOAD PRODUCTS
// ======================================================

async function loadProducts() {

    try {

        const snapshot = await getDocs(collection(db, "products"));

        products = [];

        snapshot.forEach(doc => {

            products.push({

                id: doc.id,

                ...doc.data()

            });

        });

        filteredProducts = [...products];

        renderProducts(filteredProducts);

        console.log("Products Loaded :", products.length);

    } catch (error) {

        console.error(error);

        if (productContainer) {

            productContainer.innerHTML = `

                <div class="text-center">

                    <h3>Unable to load products.</h3>

                    <p>Please try again later.</p>

                </div>

            `;

        }

    }

}

// ======================================================
// START
// ======================================================

loadProducts();

// ======================================================
// PART-2 CONTINUE
// ======================================================
//
// Product Card Generator
// Search
// Brand Filter
// Live Search
// Animation
// WhatsApp Link
// Product Details
//
// ======================================================
// SH GLOBAL TECHNOLOGY (SHGT-v2.0)
// FINAL APP.JS - PART 2
// ======================================================

// ======================================================
// PRODUCT CARD
// ======================================================

function renderProducts(productList) {

    if (!productContainer) return;

    if (!productList.length) {

        productContainer.innerHTML = `

            <div class="text-center" style="grid-column:1/-1;padding:60px 20px;">

                <h2>No Products Found</h2>

                <p>Please try another search.</p>

            </div>

        `;

        return;
    }

    productContainer.innerHTML = "";

    productList.forEach(product => {

        const image = product.image || "images/no-image.png";

        const brand = product.brand || "";

        const model = product.model || "";

        const price = product.price || "Contact";

        const description = product.description || "";

        const card = document.createElement("div");

        card.className = "product-card fade-up";

        card.innerHTML = `

            <div class="product-image">

                <img src="${image}"
                     alt="${model}"
                     loading="lazy">

            </div>

            <div class="product-content">

                <div class="product-brand">

                    ${brand}

                </div>

                <h3 class="product-title">

                    ${model}

                </h3>

                <p class="product-description">

                    ${description}

                </p>

                <div class="product-price">

                    ${price}

                </div>

                <div class="product-actions">

                    <a class="view-btn"
                       href="product.html?id=${product.id}">

                        View Details

                    </a>

                    <a class="quote-btn"
                       target="_blank"
                       href="https://wa.me/8801621007916?text=${encodeURIComponent(
                           "Hello SH Global Technology, I am interested in " + model
                       )}">

                        WhatsApp

                    </a>

                </div>

            </div>

        `;

        productContainer.appendChild(card);

    });

}

// ======================================================
// SEARCH
// ======================================================

if (searchInput) {

    searchInput.addEventListener("input", e => {

        const keyword = e.target.value.trim().toLowerCase();

        filteredProducts = products.filter(product => {

            const model = (product.model || "").toLowerCase();

            const brand = (product.brand || "").toLowerCase();

            const description = (product.description || "").toLowerCase();

            return model.includes(keyword) ||
                   brand.includes(keyword) ||
                   description.includes(keyword);

        });

        renderProducts(filteredProducts);

    });

}

// ======================================================
// BRAND FILTER
// ======================================================

brandButtons.forEach(button => {

    button.addEventListener("click", () => {

        brandButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        const selectedBrand = button.dataset.brand;

        if (selectedBrand === "all") {

            filteredProducts = [...products];

        } else {

            filteredProducts = products.filter(product =>

                (product.brand || "").toLowerCase() ===
                selectedBrand.toLowerCase()

            );

        }

        renderProducts(filteredProducts);

    });

});

// ======================================================
// SCROLL ANIMATION
// ======================================================

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("fade-up");

        }

    });

}, {

    threshold: 0.2

});

function observeCards() {

    document.querySelectorAll(".product-card").forEach(card => {

        observer.observe(card);

    });

}

const originalRenderProducts = renderProducts;

renderProducts = function(list){

    originalRenderProducts(list);

    observeCards();

};

// ======================================================
// PAGE READY
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("==================================");

    console.log("SHGT-v2.0 Ready");

    console.log("Firebase Connected");

    console.log("Search Ready");

    console.log("Brand Filter Ready");

    console.log("Product Loader Ready");

    console.log("==================================");

});

// ======================================================
// END OF APP.JS
// ======================================================
