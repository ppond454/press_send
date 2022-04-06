import firebase from "firebase/compat/app"
import 'firebase/compat/auth';
import "firebase/compat/firestore"

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
  apiKey: "AIzaSyD5NIF1aL148MnPGtkOaOLSMmeS07iuYak",
  authDomain: "chats-a71da.firebaseapp.com",
  databaseURL:
    "https://chats-a71da-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chats-a71da",
  storageBucket: "chats-a71da.appspot.com",
  messagingSenderId: "666119106094",
  appId: "1:666119106094:web:e31484b7db3483a17279bf",
  measurementId: "G-3S7CVNTZ67",
}

firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()
export const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: "select_account" })


export const signInWithGoogle = () => auth.signInWithPopup(provider)
export default firebase
