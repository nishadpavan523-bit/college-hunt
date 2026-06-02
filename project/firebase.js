// // firebase.js
// // ✅ Correct format — CDN imports (no npm needed, works directly in browser)

// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
// import { getFirestore }  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// const firebaseConfig = {
//   apiKey:            "AIzaSyB8gAv4OzC0NOdgqcOk9PgOxm8gjrpmt8c",
//   authDomain:        "college-hunt-9e8d4.firebaseapp.com",
//   projectId:         "college-hunt-9e8d4",
//   storageBucket:     "college-hunt-9e8d4.firebasestorage.app",
//   messagingSenderId: "740579599422",
//   appId:             "1:740579599422:web:ca34ba65a2138970e0dd6f",
//   measurementId:     "G-H2SCZMTX84"
// };

// const app = initializeApp(firebaseConfig);
// const db  = getFirestore(app);

// export { app, db };
// firebase.js
// Import the functions you need from the SDKs you need
// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB8gAv4OzC0NOdgqcOk9PgOxm8gjrpmt8c",
  authDomain: "college-hunt-9e8d4.firebaseapp.com",
  databaseURL: "https://college-hunt-9e8d4-default-rtdb.firebaseio.com",
  projectId: "college-hunt-9e8d4",
  storageBucket: "college-hunt-9e8d4.firebasestorage.app",
  messagingSenderId: "740579599422",
  appId: "1:740579599422:web:0b065b180f6c9d81e0dd6f",
  measurementId: "G-01CSCWKJZ5"
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

export { db, collection, addDoc, serverTimestamp };