import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
  getDocs,
  updateDoc,
  QuerySnapshot,
} from "firebase/firestore"
import firebase, {
  signInWithGoogle,
  signInWithGithub,
  auth,
  db,
} from "../config/firebase"
import {
  AUTHING,
  AUTHED,
  SIGNOUT,
  ERROR_AUTH,
  Actions,
} from "../types/authType"
import { Dispatch } from "redux"

export const authing = (): Actions => ({
  type: AUTHING,
})
export const authed = (userData: firebase.User): Actions => ({
  type: AUTHED,
  userData,
})
export const error_auth = (): Actions => ({
  type: ERROR_AUTH,
})

export const signout = (): Actions => ({
  type: SIGNOUT,
})

// export const signUserIn = (email: string, password: string) => {
//   return async (dispatch: Dispatch<Actions>) => {
//     try {
//       dispatch(authing())
//       const res = await sigin(email, password)
//       dispatch(authed(res))
//     } catch (err) {
//       dispatch(error_auth())
//     }
//   }
// }

const checkUser = async (user: firebase.User) => {
  try {
    let users: any = []
    const querySnapshot = await getDocs(
      query(collection(db, "users"), where("uid", "in", [user.uid]))
    )
    querySnapshot.forEach((doc) => {
      users.push(doc.data())
    })
    // console.log(users)
    if (users.length === 0) {
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: user.displayName,
        email: user.providerData[0]?.email || user.email,
        createdAt: Timestamp.fromDate(new Date()).toDate(),
        isOnline: true,
        photoURL: user.photoURL,
        requestedBy: [],
        requestedTo: [],
        friend: [],
      })
    } else if (users.length === 1) {
      await updateDoc(doc(db, "users", user.uid), {
        isOnline: true,
      })
    }
  } catch (err) {
    throw err
  }
}

export const authGoogle = () => {
  return async (dispatch: Dispatch<Actions>) => {
    try {
      dispatch(authing())
      await signInWithGoogle().then(async () => {
        const user = auth.currentUser as firebase.User
        await checkUser(user)
        dispatch(authed(user))
      })
    } catch (err) {
      dispatch(error_auth())
      throw err
    }
  }
}

export const authGit = () => {
  return async (dispatch: Dispatch<Actions>) => {
    try {
      dispatch(authing())
      await signInWithGithub().then(() => {
        const user = auth.currentUser as firebase.User
        checkUser(user)
        dispatch(authed(user))
      })
    } catch (err) {
      dispatch(error_auth())
      throw err
    }
  }
}

export const signoutUser = (uid: string) => {
  return async (dispatch: Dispatch<Actions>) => {
    try {
      await updateDoc(doc(db, "users", uid), {
        isOnline: false,
      })
      await auth.signOut().then(() => {
        localStorage.clear()
        dispatch(signout())
      })
    } catch (err) {
      dispatch(error_auth())
      throw err
    }
  }
}
