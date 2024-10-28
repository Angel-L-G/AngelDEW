import { getDocs, setDoc, doc } from "firebase/firestore/lite";
import { db } from "./FirebaseConfig";

export default async function save(uid, data) {
    try {
        // Referencia al documento de usuario en Firestore
        const userRef = doc(db, "userData", uid);
    
        // Guarda el objeto en Firestore
        await setDoc(userRef, data);
    
        console.log("Usuario guardado con éxito");
    } catch (error) {
        console.error("Error al guardar el usuario:", error);
    }
}

export async function update(data) {

}

export async function getById(uid){
    const userCollectionRef = collection(db, "userData");
    
    // Crear una consulta para obtener documentos con el `uid` proporcionado
    const q = query(userCollectionRef);

    console.log("1");
    console.log(q);
    
    try {
        // Ejecutar la consulta y obtener los documentos
        const querySnapshot = await getDocs(q);

        console.log("2");
        console.log(querySnapshot);
        
        // Si existen documentos, mapear los datos
        const userData = querySnapshot.docs.map(doc => ({
            id: doc.id,      // ID del documento
            ...doc.data()    // Datos del documento
        }));
        
        console.log("Datos del usuario:", userData);
        return userData;   // Retorna los datos obtenidos
    } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
        return null;
    }
}