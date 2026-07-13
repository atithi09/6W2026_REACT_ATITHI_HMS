// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnCLCo-kdqVGvlVgd6erv0qbHqSBmCJ5Q",
  authDomain: "hospital-management-syst-7cab3.firebaseapp.com",
  projectId: "hospital-management-syst-7cab3",
  storageBucket: "hospital-management-syst-7cab3.firebasestorage.app",
  messagingSenderId: "86079024316",
  appId: "1:86079024316:web:535a30d28d872c718b34b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);