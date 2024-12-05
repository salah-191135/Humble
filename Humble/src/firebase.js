// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA0h9uvA-8-qdBuFys-yGwDYaedOFZ_vnc",
    authDomain: "humble-ab9eb.firebaseapp.com",
    projectId: "humble-ab9eb",
    storageBucket: "humble-ab9eb.firebasestorage.app",
    messagingSenderId: "148315868016",
    appId: "1:148315868016:web:28a463306095d612581db5",
    measurementId: "G-2PMYSZ9M2H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };