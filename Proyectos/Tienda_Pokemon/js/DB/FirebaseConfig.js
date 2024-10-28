// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, doc } from "firebase/firestore/lite";
import { getAuth, connectAuthEmulator } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyC_DVp14-_lDT2hP0iRtK_dnfS50TZJkrQ",
    authDomain: "compra-pokemon-angel.firebaseapp.com",
    projectId: "compra-pokemon-angel",
    storageBucket: "compra-pokemon-angel.appspot.com",
    messagingSenderId: "1063777799547",
    appId: "1:1063777799547:web:023d109604fccdd04701de"
};

export default function initFirebase() {
    return initializeApp(firebaseConfig);
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
