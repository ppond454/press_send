import { info } from "./userType"

export interface InitialState {
  selectUser :info | null
  isFetching: boolean
  isError: boolean
}

interface SELECTING {
  type: typeof SELECTING
}
interface SELECTED {
  type: typeof SELECTED
  selectUser : info
}
interface ERROR_SELECTING {
  type: typeof ERROR_SELECTING
}
interface CLEAR_SELECTING {
  type: typeof CLEAR_SELECTING
}

export const SELECTING = "SELECTING"
export const SELECTED = "SELECTED"
export const ERROR_SELECTING = "ERROR_SELECTING"
export const CLEAR_SELECTING = "CLEAR_SELECTING"

export type selectAction = SELECTING | SELECTED | ERROR_SELECTING | CLEAR_SELECTING
