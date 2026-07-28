// ==========================================
// SH GLOBAL TECHNOLOGY
// SHGT-v2.0
// Product Loading & Search System
// ==========================================


let allProducts = [];


// Load Products

fetch("data/products.json")

.then(response => response.json())

.then(data => {

    allProducts = data;

    displayProducts(allProducts);

})

.catch(error => {

    console.log("Product Loading Failed:", error);

    document.getElementById("productContainer").innerHTML =
    
    "<h3>Product Loading Failed</h3>";

});





// Display Product Function


function displayProducts(products){


let container = document.getElementById("productContainer");


container.innerHTML="";



products.forEach(product => {



let card = `


<div class="product-card">


<img src="${product.image}" 
alt="${product.name}">


<h3>
${product.name}
</h3>


<p>
Brand: ${product.brand}
</p>


<p>
${product.description}
</p>



<a href="product.html?id=${product.id}">
View Details
</a>



</div>


`;



container.innerHTML += card;



});


}





// Search Function


document
.getElementById("searchInput")
.addEventListener("keyup",function(){



let value = this.value.toLowerCase();



let result = allProducts.filter(product =>


product.name
.toLowerCase()
.includes(value)


);



displayProducts(result);



});







// Brand Filter Function


function filterBrand(brand){



if(brand=="All"){


displayProducts(allProducts);


return;


}




let result = allProducts.filter(product =>


product.brand == brand


);



displayProducts(result);



}
