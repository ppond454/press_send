import firebase  from "firebase/compat/app"
import { FirebaseOptions, initializeApp  } from "firebase/app"
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
// import "dotenv/config"

const firebaseConfig : FirebaseOptions = {
  apiKey: import.meta.env.VITE_API_KEY  as string,
  authDomain:import.meta.env.VITE_AUTH_DOMAIN  as string,
  projectId: import.meta.env.VITE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_STORANGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_MESSAGEING_SENDER_ID as string,
  appId: import.meta.env.VITE_APP_ID as string , 
  measurementId: import.meta.env.VITE_MEASUREMENT_ID as string,
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

