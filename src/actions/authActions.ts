import firebase, { signInWithGoogle, auth } from "../config/firebase"
import {
  AUTHING,
  AUTHED,
  SIGNOUT,
  ERROR_AUTH,
  Actions,
  User,
} from "../types/index"
import { Dispatch } from "redux"


export const authing = (): Actions => ({
  type: AUTHING,
})
export const authed = (userData: firebase.User ): Actions => ({
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

export const authGoogle = () => {
  return async (dispatch: Dispatch<Actions>) => {
    try {
      dispatch(authing())
      await signInWithGoogle().then(()=>{
        const user = auth.currentUser as firebase.User
        dispatch(authed(user))
      })
    } catch (err) {
      dispatch(error_auth())
      throw err
    }
  }
}

export const signoutGoogle = () => {
  return async (dispatch: Dispatch<Actions>) => {
    try {
      dispatch(authing())
      await auth.signOut().then(() => {
        dispatch(signout())
      })
    } catch (err) {
      dispatch(error_auth())
      throw err
    }
  }
}
