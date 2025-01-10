import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyA7kvBfwEBw3POxhTgkSCbE1PmSwkemDRs",
  authDomain: "login-7f47f.firebaseapp.com",
  projectId: "login-7f47f",
  storageBucket: "login-7f47f.firebasestorage.app",
  messagingSenderId: "181234160531",
  appId: "1:181234160531:web:0028840cf04459e9398e66",
  measurementId: "G-98X9FBJT3C"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app };
