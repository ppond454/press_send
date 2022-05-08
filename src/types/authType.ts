import firebase from "../config/firebase"

export const AUTHING = "AUTHING"
export const AUTHED = "AUTHED"
export const ERROR_AUTH = "ERROR_AUTH"
export const SIGNOUT = "SIGNOUT"


export interface InitialState {
  isFetching: boolean
  isError: boolean
  userData?: firebase.User
  isLogin: boolean
}

// interface AUTHING extends InitialState{
//   type : typeof AUTHING
// }
// interface AUTHED extends InitialState{
//   type : typeof AUTHED
// }
// interface ERROR_AUTH extends InitialState{
//   type : typeof ERROR_AUTH
// }

interface AUTHING {
  type: typeof AUTHING
}
interface AUTHED {
  type: typeof AUTHED
  userData: firebase.User
}
interface ERROR_AUTH {
  type: typeof ERROR_AUTH
}
interface SIGNOUT {
  type: typeof SIGNOUT
}

export type Actions = AUTHING | AUTHED | ERROR_AUTH | SIGNOUT


