import { getDoc, setDoc, doc } from "firebase/firestore/lite";
import { collection, query, where } from "firebase/firestore";
import { db } from "./FirebaseConfig";
import UserData from "../classes/UserData.js";

export default async function save(uid, data) {
    console.log("1");
    console.log(uid);
    console.log(data);
    console.log("1.1");
    try {
        console.log("2");
        // Referencia al documento de usuario en Firestore
        const userRef = doc(db, "userData", uid);
        console.log("3");
        // Guarda el objeto en Firestore
        await setDoc(userRef, data);
    
        console.log("Usuario guardado con éxito");
    } catch (error) {
        console.error("Error al guardar el usuario:", error);
    }
}

export async function getById(uid) {
    try {
        const docRef = doc(db, "userData", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            //console.log("Datos del usuario:", docSnap.data());
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            console.log("No se encontró usuario con este UID.");
            return null;
        }
    } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
        return null;
    }
}