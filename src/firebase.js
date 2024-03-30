// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth , GoogleAuthProvider} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDFOvsTyCKxkePYI9kO70M2MbhjSewfylM",
    authDomain: "financetracker-f6eb5.firebaseapp.com",
    projectId: "financetracker-f6eb5",
    storageBucket: "financetracker-f6eb5.appspot.com",
    messagingSenderId: "225156098127",
    appId: "1:225156098127:web:80d8d5037203aea180e23a",
    measurementId: "G-YKZ17EFEMF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db= getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {db, auth, provider, doc , setDoc};

