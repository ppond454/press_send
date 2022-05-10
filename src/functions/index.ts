import { info } from "../types/userType"
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
  arrayUnion,
  arrayRemove,
  deleteField,
} from "firebase/firestore"
import firebase, { db, auth } from "../config/firebase"
import { Chats } from "../types/chatsType"
import CryptoJS, { AES } from "crypto-js"
import { async } from "@firebase/util"
export const isValidateEmail = (email: string): boolean => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    )

  if (email === "") return true //  pass
  if (email !== "" && re) return true //   pass

  return false // not pass
}
interface users {
  id: string
  username: string
  email: string
  password: string
}

export const users: users[] = [
  {
    id: "a",
    username: "aa",
    email: "a@gmail.com",
    password: "1234",
  },
]

export const sigin = (email: string, password: string): Promise<users> => {
  return new Promise((resolve, reject) => {
    const user = users.find(
      (user) => user.email === email && user.password === password
    )
    setTimeout(() => {
      if (user) {
        resolve(user)
      } else {
        reject("cannot find user")
      }
    }, 2000)
  })
}

export const requestFriend = async (from: info, to: info) => {
  try {
    await updateDoc(doc(db, `users`, from.uid), {
      requestedTo: arrayUnion(to),
    })
    await updateDoc(doc(db, `users`, to.uid), {
      requestedBy: arrayUnion(from),
    })
  } catch (err) {
    throw err
  }
}

export const acceptFriend = async (from: info, to: info) => {
  try {
    await updateDoc(doc(db, `users`, to.uid), {
      requestedTo: arrayRemove(from),
    })
    await updateDoc(doc(db, `users`, from.uid), {
      requestedBy: arrayRemove(to),
    })
    await updateDoc(doc(db, `users`, from.uid), {
      friend: arrayUnion(to),
    })
    await updateDoc(doc(db, `users`, to.uid), {
      friend: arrayUnion(from),
    })
  } catch (err) {
    throw err
  }
}
export const declineFriend = async (from: info, to: info) => {
  try {
    await updateDoc(doc(db, `users`, to.uid), {
      requestedTo: arrayRemove(from),
    })
    await updateDoc(doc(db, `users`, from.uid), {
      requestedBy: arrayRemove(to),
    })
  } catch (err) {
    throw err
  }
}

export const sendMsg = async (chat: Chats) => {
  const id: string = generateID(chat.from, chat.to)

  await addDoc(collection(db, "messages", id, "chats"), {
    ...chat,
    createdAt: Timestamp.fromDate(chat.createdAt),
  })

  await setDoc(doc(db, "lastMsg", id), {
    ...chat,
    createdAt: Timestamp.fromDate(chat.createdAt),
    unread: true,
  })
}

export const generateID = (me: string, friend: string) => {
  const id = me > friend ? `${me + friend}` : `${friend + me}`
  return id
}

export const encrypt = async (id: string, text: string) => {
  let msg = AES.encrypt(text, id).toString()
  return msg
}
export const decrypt = async (id: string, text: string) => {
  let msg = AES.decrypt(text, id).toString(CryptoJS.enc.Utf8)
  return msg
}

export const unreadUpdate = async (myUid: string, friendUid: string) => {
  let id = generateID(myUid, friendUid)
  const docSnap = await getDoc(doc(db, "lastMsg", id))
  if (docSnap.data() && docSnap.data()?.from !== myUid) {
    await updateDoc(doc(db, "lastMsg", id), { unread: false })
  }
}
