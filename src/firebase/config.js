// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA39FYwBxWB4rIYlDs2cGC9vWByzhJz7Pw",
  authDomain: "ecommerce-rocamek.firebaseapp.com",
  projectId: "ecommerce-rocamek",
  storageBucket: "ecommerce-rocamek.firebasestorage.app",
  messagingSenderId: "444136037176",
  appId: "1:444136037176:web:70597bfe29e811426dbfcd",
};

// Initialize Firebase and database

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
