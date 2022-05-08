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

