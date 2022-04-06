import { Actions, InitialState } from "../types/index"

const initialState: InitialState = {
  userData: undefined,
  isFetching: false,
  isError: false,
  isLogin: false,
}

const authReducers = (state = initialState, action: Actions) => {
  switch (action.type) {
    case "AUTHING":
      return Object.assign({}, state, {
        userData: undefined,
        isFetching: true,
        isError: false,
        isLogin: false,
      })
    case "AUTHED":
      return Object.assign({}, state, {
        userData: action.userData,
        isFetching: false,
        isError: false,
        isLogin: true,
      })
    case "ERROR_AUTH":
      return Object.assign({}, state, {
        userData: undefined,
        isFetching: false,
        isError: true,
        isLogin: false,
      })
      case "SIGNOUT":
        return Object.assign({}, state, {
          userData: undefined,
          isFetching: false,
          isError: false,
          isLogin: false,
        })
    default:
      return state
  }
}

export default authReducers
