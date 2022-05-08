import { combineReducers } from "redux"
import authReducers from "./authReducers"
import fetchUserReducers from "./fetchUserReducers"
import fetchSelectUser from "./selecteChatReducers"
import unReadReducers from "./unReadReducers"
import fetchChatReducers from "./fetchChatReducers"

export default combineReducers({
  authUser: authReducers,
  fetchUser: fetchUserReducers,
  fetchSelectUser:fetchSelectUser,
  fetchChat:fetchChatReducers ,
  fetchUnread: unReadReducers, 
})
