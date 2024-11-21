import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app, auth } from "../DB/FirebaseConfig.js";
import UserData from "./UserData.js";
import save from "../DB/DAO.js";

export default class SesionManager{

    async login(email, password) {
        let ok = false;
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            localStorage.setItem('user', JSON.stringify(user));
            ok = true;
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
        }
        return ok;
    }
    
    async register(email, password) {
        let ok = false;
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            localStorage.setItem('user', JSON.stringify(user));
            ok = true;

            // Guardar el usuario en la base de datos
            let userData = new UserData(user.uid);
            userData.history = {};
            await save(user.uid, userData.toJson());

        } catch (error) {
            console.error("Error al registrar usuario:", error);
        }
        return ok;
    }
    
    async logout() {
        let ok = false
        try {
            await signOut(auth);
            localStorage.clear();
            ok = true;
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
        return ok;
    }

}