import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  type UserCredential,
  signInWithCredential,
  EmailAuthProvider,
} from 'firebase/auth'
import { auth } from './firebaseConfig'

export async function register(email: string, password: string): Promise<UserCredential> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    console.log('Usuario registrado:', userCredential.user)
    return userCredential
  } catch (error: any) {
    console.error('Error al registrar:', error.message)
    throw error
  }
}

export async function login(email: string, password: string): Promise<UserCredential> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)

    let token = await userCredential.user.getIdToken();
    localStorage.setItem('user', JSON.stringify(userCredential))
    localStorage.setItem('token', token)
    localStorage.setItem('email', email)
    return userCredential
  } catch (error: any) {
    console.error('Error al iniciar sesión:', error.message)
    throw error
  }
}

export function loginWithToken(email: string, token: string) {
  const credential = EmailAuthProvider.credentialWithLink(email, token)
  signInWithCredential(auth, credential)
    .then((userCredential) => {
      const user = userCredential.user
      console.log('Usuario autenticado con el token:', user)
    })
    .catch((error) => {
      console.error('Error al autenticar con el token:', error)
    })
}

export function logoutUser() {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  localStorage.removeItem('email');
  console.log('Usuario cerrado sesión');
}

