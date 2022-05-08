import firebase from "firebase/compat/app"
import { initializeApp } from "firebase/app"
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_API_KEY,
//   authDomain:import.meta.env.VITE_AUTH_DOMAIN,
//   databaseURL:import.meta.env.VITE_DATA_BASE_URL,
//   projectId: import.meta.env.VITE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_STORANGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_MESSAGEING_SENDER_ID,
//   appId: import.meta.env.VITE_APP_ID,
//   measurementId: import.meta.env.VITE_MEASUREMENT_ID,
// }

const firebaseConfig = {
  apiKey: "AIzaSyD_-pe_q5H4LJdIStV9CZsrmewwvqRBhoQ",
  authDomain: "chats-c24c3.firebaseapp.com",
  projectId: "chats-c24c3",
  storageBucket: "chats-c24c3.appspot.com",
  messagingSenderId: "684175761372",
  appId: "1:684175761372:web:8d5ee80dba854c5f6bb919",
  measurementId: "G-G24DBJ34GN"
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: "select_account" })

const gitProvider = new GithubAuthProvider()
gitProvider.setCustomParameters({ prompt: "select_account" })

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider)
export const signInWithGithub = () => signInWithPopup(auth, gitProvider)

export default firebase

