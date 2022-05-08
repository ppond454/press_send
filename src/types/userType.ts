export const FETCHING = "FETCHING"
export const FETCHED = "FETCHED"
export const ERROR_FETCHING = "ERROR_FETCHING"
export const CLEAR = "CLEAR"

export interface info {
  uid: string
  name: string
  photoURL: string
}

export interface Users {
  createAt: Date
  email: string
  name: string
  isOnline: boolean
  photoURL: string
  uid: string
  requestedBy: info[] 
  requestedTo: info[] 
  friend: info[] 
}

export interface InitialState {
  users: Users[] | []
  info?: Users 
  isFetching: boolean
  isError: boolean
}

interface FETCHING {
  type: typeof FETCHING
}
interface FETCHED {
  type: typeof FETCHED
  users: Users[]
  info: Users
}
interface ERROR_FETCHING {
  type: typeof ERROR_FETCHING
}
interface CLEAR {
  type: typeof CLEAR
}

export type fetchUserActions = FETCHING | ERROR_FETCHING | CLEAR | FETCHED
