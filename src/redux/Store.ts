import thunk from "redux-thunk"
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux'
import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import Reducers from "../reducers/Reducers"

const Store = createStore(Reducers, composeWithDevTools(applyMiddleware(thunk)))

type RootState = ReturnType<typeof Store.getState>
type AppDispath = typeof Store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispath>()


export default Store
