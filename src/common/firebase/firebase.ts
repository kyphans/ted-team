// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvLg74dcZWJjtCvJvp-XpqEmqF10jTiMk",
  authDomain: "ted-team.firebaseapp.com",
  projectId: "ted-team",
  storageBucket: "ted-team.appspot.com",
  messagingSenderId: "945728010356",
  appId: "1:945728010356:web:110952f1a9ec1872c4f921",
  measurementId: "G-4M582CQHJS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const analytics = getAnalytics(app);
export default db;