// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBvX-r7f0mQp05plaViB4e46nQz_VYqJpQ",
    authDomain: "car-doctor-21ef9.firebaseapp.com",
    projectId: "car-doctor-21ef9",
    storageBucket: "car-doctor-21ef9.appspot.com",
    messagingSenderId: "799625302994",
    appId: "1:799625302994:web:fe786162a26730fa9aae0b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;