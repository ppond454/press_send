import { InitialState, selectAction } from "../types/selectChatType"

const initialState: InitialState = {
  selectUser: null,
  isFetching: false,
  isError: false,
}

const fetchChats = (state = initialState, action: selectAction) => {
  switch (action.type) {
    case "SELECTING":
      return Object.assign({}, state, {
        isFetching: true,
      })
    case "SELECTED":
      return Object.assign({}, state, {
        selectUser: action.selectUser,
        isFetching: false,
        isError: false,
      })
    case "ERROR_SELECTING":
      return Object.assign({}, state, {
        isError: true,
      })
    case "CLEAR_SELECTING":
      return Object.assign({}, state, {
        selectUser: null,
        isFetching: false,
        isError: false,
      })
    default:
      return state
  }
}

export default fetchChats
