// ======================================================
// SH GLOBAL TECHNOLOGY (SHGT-v2.0)
// ADMIN DASHBOARD FINAL JS
// ======================================================


import {

    db,

    storage

} from "../js/firebase.js";



import {

    collection,

    getDocs,

    deleteDoc,

    doc

} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";



import {

    ref,

    deleteObject

} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-storage.js";



// ======================================================
// DOM
// ======================================================


const productCount =
document.getElementById("productCount");


const productList =
document.getElementById("adminProductList");



// ======================================================
// LOAD PRODUCTS
// ======================================================


async function loadAdminProducts(){


try{


const snapshot =
await getDocs(
collection(db,"products")
);



let count = 0;



productList.innerHTML = "";



snapshot.forEach(item=>{


count++;


const product = {

id:item.id,

...item.data()

};



const row =
document.createElement("tr");



row.innerHTML = `


<td>

<img src="${
product.image ||
"../images/no-image.png"

}"

width="70"
height="70"
style="object-fit:cover;border-radius:8px;">


</td>



<td>

${product.model || ""}

</td>



<td>

${product.brand || ""}

</td>



<td>

${product.price || "Contact"}

</td>



<td>


<a href="../product.html?id=${product.id}"
target="_blank"
class="btn btn-primary">


View

</a>



<button
class="btn delete-btn"
data-id="${product.id}"
data-image="${product.image || ""}">


Delete

</button>



</td>



`;



productList.appendChild(row);



});



productCount.innerHTML = count;



// Delete Event

document
.querySelectorAll(".delete-btn")
.forEach(button=>{


button.addEventListener(
"click",
()=>{


deleteProduct(

button.dataset.id,

button.dataset.image

);


});


});



}

catch(error){


console.error(
"Dashboard Error:",
error
);



productList.innerHTML = `

<tr>

<td colspan="5">

Unable to load products

</td>

</tr>

`;



}


}



// ======================================================
// DELETE PRODUCT
// ======================================================


async function deleteProduct(id,image){


const confirmDelete =
confirm(
"Are you sure you want to delete this product?"
);



if(!confirmDelete)
return;



try{



// Delete Firestore Data

await deleteDoc(

doc(
db,
"products",
id

)

);




// Delete Storage Image

if(image){


try{


const imageRef =
ref(storage,image);


await deleteObject(imageRef);


}

catch(error){

console.log(
"Image delete skipped"
);

}


}



alert(
"Product Deleted Successfully"
);



loadAdminProducts();



}

catch(error){


console.error(error);


alert(
"Delete Failed"
);


}



}



// ======================================================
// START
// ======================================================


loadAdminProducts();



console.log(
"SHGT Dashboard Ready"
);
