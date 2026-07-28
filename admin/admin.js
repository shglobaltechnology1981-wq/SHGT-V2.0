// ======================================================
// SH GLOBAL TECHNOLOGY (SHGT-v2.0)
// ADMIN PANEL FINAL JAVASCRIPT
// ======================================================


import {

    auth,

    db,

    storage

} from "../js/firebase.js";



import {

    signInWithEmailAndPassword,

    signOut,

    onAuthStateChanged

} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";



import {

    collection,

    addDoc,

    serverTimestamp

} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";



import {

    ref,

    uploadBytes,

    getDownloadURL

} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-storage.js";



// ======================================================
// LOGIN SYSTEM
// ======================================================


const loginBtn =
document.getElementById("loginBtn");



if(loginBtn){


loginBtn.addEventListener("click",async()=>{


const email =
document.getElementById("email").value;


const password =
document.getElementById("password").value;


const message =
document.getElementById("loginMessage");



try{


await signInWithEmailAndPassword(

    auth,

    email,

    password

);



message.innerHTML =
"Login Successful...";


window.location.href =
"dashboard.html";



}

catch(error){


console.log(error);


message.innerHTML =
"Login Failed. Check Email & Password";


}



});


}



// ======================================================
// AUTH CHECK
// ======================================================


onAuthStateChanged(auth,user=>{


if(user){


console.log(
"Admin Login:",
user.email
);


}

else{


if(
location.pathname.includes("dashboard") ||
location.pathname.includes("upload")
)

{

window.location.href =
"login.html";


}


}



});



// ======================================================
// LOGOUT
// ======================================================


const logoutBtn =
document.getElementById("logoutBtn");



if(logoutBtn){


logoutBtn.addEventListener("click",async()=>{


await signOut(auth);


window.location.href =
"login.html";


});


}



// ======================================================
// PRODUCT UPLOAD
// ======================================================


const uploadBtn =
document.getElementById("uploadBtn");



if(uploadBtn){


uploadBtn.addEventListener(
"click",
async()=>{


const message =
document.getElementById(
"uploadMessage"
);



try{


const model =
document.getElementById(
"model"
).value;



const brand =
document.getElementById(
"brand"
).value;



const price =
document.getElementById(
"price"
).value;



const description =
document.getElementById(
"description"
).value;



const specificationText =
document.getElementById(
"specification"
).value;



const file =
document.getElementById(
"productImage"
).files[0];



if(!file){


message.innerHTML =
"Please select image";


return;


}



// ============================
// IMAGE UPLOAD
// ============================


const imageRef =
ref(

storage,

"products/" + Date.now() + "-" + file.name

);



await uploadBytes(

imageRef,

file

);



const imageURL =
await getDownloadURL(
imageRef
);



// ============================
// FIRESTORE SAVE
// ============================


await addDoc(

collection(db,"products"),

{


model:model,


brand:brand,


price:price,


description:description,


image:imageURL,


specification:

specificationText
.split(",")
.map(item=>item.trim()),


createdAt:
serverTimestamp()


}


);



message.innerHTML =
"Product Upload Successful";



// Clear Form


document.getElementById(
"model"
).value="";


document.getElementById(
"price"
).value="";


document.getElementById(
"description"
).value="";


document.getElementById(
"specification"
).value="";



}

catch(error){


console.error(error);


message.innerHTML =
"Upload Failed";


}



});


}


// ======================================================
// READY
// ======================================================


console.log(
"SHGT Admin System Ready"
);
