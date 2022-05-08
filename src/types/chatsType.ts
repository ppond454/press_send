import { info } from "./userType"
import { Timestamp } from "firebase/firestore"

export interface Chats {
  from: string
  to: string
  text: string
  createdAt: Date 
  media?: string
}

export interface InitialState {
  chats: Chats[] | []
  isFetching: boolean
  isError: boolean
}

interface FETCHING_CHATS {
  type: typeof FETCHING_CHATS
}
interface FETCHED_CHATS {
  type: typeof FETCHED_CHATS
  chats: Chats[]
}
interface ERROR_FETCH_CHATS {
  type: typeof ERROR_FETCH_CHATS
}
interface CLEAR_FETCH_CHATS {
  type: typeof CLEAR_FETCH_CHATS
}

export const FETCHING_CHATS = "FETCHING_CHATS"
export const FETCHED_CHATS = "FETCHED_CHATS"
export const ERROR_FETCH_CHATS = "ERROR_FETCH_CHATS"
export const CLEAR_FETCH_CHATS = "CLEAR_FETCH_CHATS"

export type ChatsActions =
  | FETCHING_CHATS
  | FETCHED_CHATS
  | ERROR_FETCH_CHATS
  | CLEAR_FETCH_CHATS
