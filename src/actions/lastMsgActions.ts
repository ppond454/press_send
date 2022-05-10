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
  getDocs,
} from "firebase/firestore"
import { db } from "../config/firebase"

import { info, Users } from "../types/userType"
import {
  unreadActions,
  CLEAR_UNREAD,
  FETCHED_UNREAD,
  ERROR_UNREAD,
  FETCHING_UNREAD,
  lastMsg,
  IlastMsgUser,
} from "../types/unreadChatsTypes"

import { generateID, decrypt } from "../functions/index"

export const fetching_unread = (): unreadActions => {
  return {
    type: FETCHING_UNREAD,
  }
}

export const fetched_unread = (lastMsg: IlastMsgUser[]): unreadActions => {
  return {
    type: FETCHED_UNREAD,
    lastMsg,
  }
}

export const error_unread = (): unreadActions => {
  return {
    type: ERROR_UNREAD,
  }
}

export const clear_unread = (): unreadActions => {
  return {
    type: CLEAR_UNREAD,
  }
}

export const fetch_lastMsg = (myUid: string) => {
  return async (dispatch: Dispatch<unreadActions>) => {
    dispatch(fetching_unread())
    try {
      // let id: string = generateID(myUid, friends.uid)

      const msgsRef = collection(db, "lastMsg")
      const q = query(msgsRef, orderBy("createdAt", "asc"))
      onSnapshot(q, async (querySnapshot: QuerySnapshot) => {
        let lastMsg: lastMsg[] = []
        querySnapshot.forEach((doc) => {
          if (doc.exists()) {
            lastMsg.push({
              ...doc.data(),
              createdAt: doc.data().createdAt.toDate(),
            } as lastMsg)
          }
        })

        const getFriends = await getDocs(
          query(collection(db, "users"), where("uid", "in", [myUid]))
        )
        let friends: info[] = []
        getFriends.forEach((doc) => {
          if (doc.exists()) {
            friends = doc.data().friend as info[]
          }
        })

        let _last = lastMsg.filter((msg) => {
          return msg.to === myUid || msg.from === myUid
        })
        let data: IlastMsgUser[] = []

        for (let i = 0; i < friends.length; i++) {
          for (let j = 0; j < _last.length; j++) {
            if (
              friends[i].uid === _last[j].to ||
              friends[i].uid === _last[j].from
            ) {
              let id = generateID(myUid, friends[i].uid)
              let _data = {
                ...friends[i],
                lastMsg: {
                  ..._last[j],
                  text: await decrypt(id, _last[j].text),
                } as lastMsg,
              }
              data.push(_data)
            }
          }
        }
        // console.log(data)
        data = data.sort(
          (a, b) =>
            b.lastMsg.createdAt.getTime() - a.lastMsg.createdAt.getTime()
        )

        dispatch(fetched_unread(data))
      })
    } catch (e) {
      dispatch(error_unread())
      throw e
    }
  }
}

export const clearUnread = () => {
  return async (dispatch: Dispatch<unreadActions>) => {
    try {
      dispatch(clear_unread())
    } catch (e) {
      dispatch(error_unread())
      throw e
    }
  }
}
