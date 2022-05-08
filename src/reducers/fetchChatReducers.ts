import { InitialState, ChatsActions } from "../types/chatsType"

const initialState: InitialState = {
  chats: [],
  isFetching: false,
  isError: false,
}

const fetchChats = (state = initialState, action: ChatsActions) => {
  switch (action.type) {
    case "FETCHING_CHATS":
      return Object.assign({}, state, {
        isFetching: true,
      })
    case "FETCHED_CHATS":
      return Object.assign({}, state, {
        chats: action.chats,
        isFetching: false,
        isError: false,
      })
    case "ERROR_FETCH_CHATS":
      return Object.assign({}, state, {
        isError: true,
      })
    case "CLEAR_FETCH_CHATS":
      return Object.assign({}, state, {
        chats: [],
        isFetching: false,
        isError: false,
      })
    default:
      return state
  }
}

export default fetchChats
