// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env["NEXT_PUBLIC_CRI-APIKEY"],
  authDomain: process.env["NEXT_PUBLIC_CRI-AUTHDOMAIN"],
  projectId: process.env["NEXT_PUBLIC_CRI-PROJECTID"],
  storageBucket: process.env["NEXT_PUBLIC_CRI-STORAGEBUCKET"],
  messagingSenderId: process.env["NEXT_PUBLIC_CRI-MESSAGINGSENDERID"],
  appId: process.env["NEXT_PUBLIC_CRI-APPID"],
  measurementId: process.env["NEXT_PUBLIC_CRI-MEASUREMENTID"],
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firebaseDatabase = getFirestore(app);
