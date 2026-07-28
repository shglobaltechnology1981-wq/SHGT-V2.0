// ======================================================
// SH GLOBAL TECHNOLOGY (SHGT-v2.0)
// FINAL PRODUCT.JS
// Product Details + Related Products
// ======================================================

import { db } from "./firebase.js";

import {
    doc,
    getDoc,
    collection,
    getDocs,
    query,
    where,
    limit
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


// ======================================================
// DOM
// ======================================================

const productDetails =
    document.getElementById("productDetails");

const relatedProducts =
    document.getElementById("relatedProducts");


// ======================================================
// GET PRODUCT ID FROM URL
// ======================================================

const urlParams = new URLSearchParams(
    window.location.search
);

const productId = urlParams.get("id");


// ======================================================
// LOAD SINGLE PRODUCT
// ======================================================

async function loadProduct(){

    if(!productId){

        showError("Product ID Not Found");

        return;

    }


    try{


        const productRef =
            doc(db,"products",productId);


        const productSnap =
            await getDoc(productRef);



        if(!productSnap.exists()){

            showError("Product Not Available");

            return;

        }



        const product = {

            id:productSnap.id,

            ...productSnap.data()

        };



        displayProduct(product);



        loadRelatedProducts(product.brand);



        document.title =
        product.model + " | SH Global Technology";



    }

    catch(error){

        console.error(error);

        showError(
            "Unable to load product information"
        );

    }

}



// ======================================================
// DISPLAY PRODUCT
// ======================================================

function displayProduct(product){


    const image =
    product.image ||
    "images/no-image.png";


    const images =
    product.images || [image];



    productDetails.innerHTML = `


    <div class="product-detail-grid">


        <div class="product-gallery">


            <img id="mainProductImage"
                 src="${image}"
                 alt="${product.model}">


            <div class="thumbnail-list">


            ${
                images.map(img=>`

                    <img src="${img}"
                         class="thumb-image"
                         onclick="changeImage('${img}')">

                `).join("")
            }


            </div>


        </div>




        <div class="product-info">


            <span class="product-brand">

                ${product.brand || ""}

            </span>



            <h1>

                ${product.model || "Product"}

            </h1>



            <h2 class="product-price">

                ${product.price || "Contact For Price"}

            </h2>



            <p>

                ${product.description || ""}

            </p>



            <div class="product-specification">


                <h3>
                    Specification
                </h3>


                <ul>


                ${
                    product.specification ?

                    product.specification
                    .map(item=>`

                        <li>
                            ${item}
                        </li>

                    `).join("")

                    :

                    "<li>Contact for details</li>"

                }


                </ul>


            </div>



            <div class="product-actions">


                <a href="
                https://wa.me/8801621007916?text=${encodeURIComponent(
                "Hello SH Global Technology, I need information about "
                + product.model
                )}
                "
                target="_blank"
                class="quote-btn">


                    <i class="fab fa-whatsapp"></i>
                    Inquiry Now


                </a>



                <a href="pdf/Machine-Catalogue-1.pdf"
                   target="_blank"
                   class="view-btn">


                    <i class="fas fa-file-pdf"></i>

                    Catalogue


                </a>



            </div>


        </div>


    </div>


    `;


}


// ======================================================
// CHANGE IMAGE
// ======================================================

window.changeImage = function(image){


    const main =
    document.getElementById(
        "mainProductImage"
    );


    if(main){

        main.src=image;

    }

};


// ======================================================
// RELATED PRODUCTS
// ======================================================

async function loadRelatedProducts(brand){


    if(!relatedProducts)
        return;



    try{


        const q =
        query(

            collection(db,"products"),

            where(
                "brand",
                "==",
                brand
            ),

            limit(4)

        );



        const snapshot =
        await getDocs(q);



        relatedProducts.innerHTML="";



        snapshot.forEach(item=>{


            const product = {

                id:item.id,

                ...item.data()

            };



            relatedProducts.innerHTML += `


            <div class="product-card">


                <div class="product-image">


                    <img src="${
                    product.image ||
                    "images/no-image.png"
                    }">


                </div>



                <div class="product-content">


                    <h3 class="product-title">

                        ${product.model}

                    </h3>



                    <a href="product.html?id=${product.id}"
                       class="view-btn">

                        View Details

                    </a>


                </div>


            </div>



            `;


        });



    }

    catch(error){

        console.error(
            "Related product error",
            error
        );

    }


}


// ======================================================
// ERROR MESSAGE
// ======================================================

function showError(message){


    if(productDetails){

        productDetails.innerHTML = `


        <div class="text-center"
             style="padding:60px">


            <h2>
                ${message}
            </h2>


            <a href="index.html"
               class="btn btn-primary">

                Back Home

            </a>


        </div>


        `;

    }


}


// ======================================================
// START
// ======================================================

loadProduct();

console.log(
"SHGT Product System Ready"
);
