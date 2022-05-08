import { info } from "./userType"
import { Chats } from "./chatsType"

export interface lastMsg extends Chats {
  unread: boolean
}

export interface IlastMsgUser extends info {
  lastMsg: lastMsg
}


export interface InitialState {
  lastMsg: IlastMsgUser[] | []
  isFetching: boolean
  isError: boolean
}

interface FETCHING_UNREAD {
  type: typeof FETCHING_UNREAD
}
interface FETCHED_UNREAD {
  type: typeof FETCHED_UNREAD
  lastMsg: IlastMsgUser[]
}
interface ERROR_UNREAD {
  type: typeof ERROR_UNREAD
}
interface CLEAR_UNREAD {
  type: typeof CLEAR_UNREAD
}

export const FETCHING_UNREAD = "FETCHING_UNREAD"
export const FETCHED_UNREAD = "FETCHED_UNREAD"
export const ERROR_UNREAD = "ERROR_UNREAD"
export const CLEAR_UNREAD = "CLEAR_UNREAD"

export type unreadActions =
  | FETCHING_UNREAD
  | FETCHED_UNREAD
  | ERROR_UNREAD
  | CLEAR_UNREAD
