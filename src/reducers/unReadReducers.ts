import { InitialState, unreadActions } from "../types/unreadChatsTypes"

const initialState: InitialState = {
  lastMsg: [] ,
  isFetching: false,
  isError: false,
}

const unreadChat = (state = initialState, action: unreadActions) => {
  switch (action.type) {
    case "FETCHING_UNREAD":
      return Object.assign({}, state, {
        isFetching: true,
      })
    case "FETCHED_UNREAD":
      return Object.assign({}, state, {
        lastMsg: action.lastMsg,
        isFetching: false,
        isError: false,
      })
    case "ERROR_UNREAD":
      return Object.assign({}, state, {
        isError: true,
      })
    case "CLEAR_UNREAD":
      return Object.assign({}, state, {
        lastMsg: [],
        isFetching: false,
        isError: false,
      })
    default:
      return state
  }
}

export default unreadChat
