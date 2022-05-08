import { InitialState, fetchUserActions } from "../types/userType"

const initialState: InitialState = {
  users: [],
  info: undefined,
  isFetching: false,
  isError: false,
}
const fetchUserReducers = (state = initialState, action: fetchUserActions) => {
  switch (action.type) {
    case "FETCHING":
      return Object.assign({}, state, {
        isFetching: true,
      })
    case "FETCHED":
      return Object.assign({}, state, {
        users: action.users,
        info: action.info,
        isFetching: false,
        isError: false,
      })
    case "ERROR_FETCHING":
      return Object.assign({}, state, {
        isError: true,
      })
    case "CLEAR":
      return Object.assign({}, state, {
        users: [],
        info: undefined,
        isFetching: false,
        isError: false,
      })
    default:
      return state
  }
}
export default fetchUserReducers
