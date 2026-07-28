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
