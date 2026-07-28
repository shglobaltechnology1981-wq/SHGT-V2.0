// =======================================================
// SH GLOBAL TECHNOLOGY (SHGT-v2.0)
// FINAL FIREBASE CONFIGURATION
// =======================================================

// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

import {
    getStorage
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-storage.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import {
    getAnalytics
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-analytics.js";


// =======================================================
// FIREBASE CONFIG
// =======================================================

const firebaseConfig = {

    apiKey: "AIzaSyCWszOZc27idF_IWhTWVOv7P7jOS-Eq3Uc",

    authDomain: "shgt-global.firebaseapp.com",

    projectId: "shgt-global",

    storageBucket: "shgt-global.firebasestorage.app",

    messagingSenderId: "825797264866",

    appId: "1:825797264866:web:966bc7af6bdb9843f725bb",

    measurementId: "G-F0HTF7M0LX"

};


// =======================================================
// INITIALIZE FIREBASE
// =======================================================

const app = initializeApp(firebaseConfig);


// =======================================================
// FIRESTORE
// =======================================================

const db = getFirestore(app);


// =======================================================
// STORAGE
// =======================================================

const storage = getStorage(app);


// =======================================================
// AUTHENTICATION
// =======================================================

const auth = getAuth(app);


// =======================================================
// ANALYTICS
// =======================================================

const analytics = getAnalytics(app);


// =======================================================
// EXPORT
// =======================================================

export {

    app,

    db,

    storage,

    auth,

    analytics

};


// =======================================================
// READY MESSAGE
// =======================================================

console.log("======================================");
console.log("SHGT-v2.0 Firebase Connected");
console.log("Project : shgt-global");
console.log("Status  : Ready");
console.log("======================================");
