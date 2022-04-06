export const isValidateEmail = (email: string): boolean => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    )

  if (email === "") return true //  pass
  if (email !== "" && re) return true //   pass

  return false // not pass
}

import {User} from "../types/index"

export const users: User[] = [
  {
    id: "a",
    username: "Somsak",
    email: "a@gmail.com",
    password: "1234",
  },
]

export const sigin = (email: string, password: string): Promise<User> => {
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
    })
  })
}
