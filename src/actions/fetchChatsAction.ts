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
  getDocs,
  getDoc,
  updateDoc,
  QuerySnapshot,
  limit,
} from "firebase/firestore"
import { db } from "../config/firebase"
import {
  Chats,
  CLEAR_FETCH_CHATS,
  FETCHED_CHATS,
  ERROR_FETCH_CHATS,
  FETCHING_CHATS,
  ChatsActions,
} from "../types/chatsType"
import { generateID, decrypt } from "../functions/index"

export const fetching_chats = (): ChatsActions => {
  return {
    type: FETCHING_CHATS,
  }
}

export const fetched_chats = (chats: Chats[]): ChatsActions => {
  return {
    type: FETCHED_CHATS,
    chats,
  }
}

export const error_fetching_chats = (): ChatsActions => {
  return {
    type: ERROR_FETCH_CHATS,
  }
}

export const clear_fetching_chats = (): ChatsActions => {
  return {
    type: CLEAR_FETCH_CHATS,
  }
}

export const fetch_chats = (myUid: string, friendId: string) => {
  return async (dispatch: Dispatch<ChatsActions>) => {
    if (!friendId) return null
    dispatch(fetching_chats())
    try {
      let id: string = generateID(myUid, friendId)
      const msgsRef = collection(db, "messages", id, "chats")
      const q = query(msgsRef, orderBy("createdAt", "asc"))

      let msgs: Chats[] = []

      const querySnapshot = await getDocs(q)
      querySnapshot.forEach(async (doc) => {
        if (doc.exists()) {
          msgs.push({
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate(),
            text: await decrypt(id, doc.data().text),
          } as Chats)
        }
      })
      const docSnap = await getDoc(doc(db, "lastMsg", id))

      if (docSnap.data() && docSnap.data()?.from !== myUid) {
        await updateDoc(doc(db, "lastMsg", id), { unread: false })
      }

      dispatch(fetched_chats(msgs))
    } catch (e) {
      dispatch(error_fetching_chats())
      throw e
    }
  }
}

export const addChats = (prev: Chats[], chat: Chats) => {
  return async (dispatch: Dispatch<ChatsActions>) => {
    dispatch(fetching_chats())
    try {
      let chats = [...prev, chat] as Chats[]
      dispatch(fetched_chats(chats))
    } catch (e) {
      dispatch(error_fetching_chats())
    }
  }
}

export const clear_chats = () => {
  return async (dispatch: Dispatch<ChatsActions>) => {
    try {
      dispatch(clear_fetching_chats())
    } catch (e) {
      dispatch(error_fetching_chats())
      throw e
    }
  }
}
