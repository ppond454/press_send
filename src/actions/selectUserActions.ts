import { Dispatch } from "redux"
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
  getDoc,
  updateDoc,
  QuerySnapshot,
  limit,
} from "firebase/firestore"
import { db } from "../config/firebase"
import {
  SELECTED,
  SELECTING,
  ERROR_SELECTING,
  CLEAR_SELECTING,
  selectAction,
} from "../types/selectChatType"
import { info, Users } from "../types/userType"
import { generateID, unreadUpdate } from "../functions/index"
import {io ,Socket} from "socket.io-client"


export const selecting = (): selectAction => {
  return {
    type: SELECTING,
  }
}

export const selected = (selectUser: info): selectAction => {
  return {
    type: SELECTED,
    selectUser,
  }
}

export const error_selecting = (): selectAction => {
  return {
    type: ERROR_SELECTING,
  }
}

export const clear_selecting = (): selectAction => {
  return {
    type: CLEAR_SELECTING,
  }
}

export const selectUsers = (myUid: string ,friends: info) => {
  return async (dispatch: Dispatch<selectAction>) => {
    if (!friends) return null
    dispatch(selecting())
    try {
      dispatch(selected(friends))
      await unreadUpdate(myUid, friends.uid)
    } catch (e) {
      dispatch(error_selecting())
      throw e
    }
  }
}

export const clear_select = () => {
  return async (dispatch: Dispatch<selectAction>) => {
    try {
      dispatch(clear_selecting())
    } catch (e) {
      dispatch(error_selecting())
      throw e
    }
  }
}
