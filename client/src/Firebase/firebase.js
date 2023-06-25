import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyByioK7R6qIy0yTAoJSAm2tqtCpmj85UyM",
    authDomain: "englishmessenger-262a1.firebaseapp.com",
    databaseURL: "https://englishmessenger-262a1-default-rtdb.firebaseio.com",
    projectId: "englishmessenger-262a1",
    storageBucket: "englishmessenger-262a1.appspot.com",
    messagingSenderId: "108659653989",
    appId: "1:108659653989:web:c30c0346dc1a1a3fba358c",
    measurementId: "G-BD89JMYEW3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()