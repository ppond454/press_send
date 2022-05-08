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
  updateDoc,
  QuerySnapshot,
  arrayUnion,
  arrayRemove,
  deleteField,
} from "firebase/firestore"
import { db } from "../config/firebase"
import { Chats } from "../types/chatsType"
import  CryptoJS,{ AES } from "crypto-js"
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

export const encrypt = (id: string, text: string): string => {
  return AES.encrypt(text, id).toString()
}
export const decrypt = (id: string, text: string): string => {
  let msg = AES.decrypt(text, id).toString(CryptoJS.enc.Utf8)
  return msg
}
