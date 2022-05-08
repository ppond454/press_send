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
  updateDoc,
  QuerySnapshot,
} from "firebase/firestore"
import { db } from "../config/firebase"
import {
  FETCHING,
  FETCHED,
  ERROR_FETCHING,
  CLEAR,
  fetchUserActions,
  Users,
  info,
} from "../types/userType"

const getUsers = async (uid: string) => {
  let users: any = []
  const querySnapshot = await getDocs(
    query(collection(db, "users"), where("uid", "not-in", [uid]))
  )
  querySnapshot.forEach((doc) => {
    users.push(doc.data())
  })
  return users
}

const getInfos = async (uid: string) => {
  let users: any = []
  const querySnapshot = await getDocs(
    query(collection(db, "users"), where("uid", "in", [uid]))
  )
  querySnapshot.forEach((doc) => {
    users.push(doc.data())
  })
  if (users.length > 0) {
    return {
      ...users[0],
    }
  }
  return {}
}

export const fetching = (): fetchUserActions => {
  return {
    type: FETCHING,
  }
}

export const fetched = (users: Users[], info: Users): fetchUserActions => {
  return {
    type: FETCHED,
    users,
    info,
  }
}

export const error_fetching = (): fetchUserActions => {
  return {
    type: ERROR_FETCHING,
  }
}

export const clear = (): fetchUserActions => {
  return {
    type: CLEAR,
  }
}

// export const fetchUsers = (users: Users[], info: Users) => {
export const fetchUsers = (uid: string) => {
  return async (dispatch: Dispatch<fetchUserActions>) => {
    dispatch(fetching())
    try {
      const usersRef = collection(db, "users")
      const q = query(usersRef, where("uid", "not-in", [uid]))

      onSnapshot(usersRef, (querySnapshot) => {
        let users: Users[] = []
        let info: Users[] = []
        querySnapshot.forEach((doc) => {
          if (doc.exists()) {
            if (doc.data().uid !== uid) users.push(doc.data() as Users)
            if (doc.data().uid === uid) info.push(doc.data() as Users)
          }
        })

        dispatch(fetched(users as Users[], { ...info[0] } as Users))
      })
    } catch (err) {
      dispatch(error_fetching())
    }
  }
}

export const clearUsers = () => {
  return async (dispatch: Dispatch<fetchUserActions>) => {
    try {
      dispatch(clear())
    } catch (err) {
      dispatch(error_fetching())
    }
  }
}
