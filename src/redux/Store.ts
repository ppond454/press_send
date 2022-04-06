import thunk from "redux-thunk"
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux'
import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { persistReducer , persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage" 

import Reducers from "../reducers/Reducers"

const persistConfig ={
    key: "root",
    storage
}
const persistedReducer = persistReducer(persistConfig, Reducers)

const Store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)))


type RootState = ReturnType<typeof Store.getState>
type AppDispath = typeof Store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispath>()

export const Persistor = persistStore(Store)
export default Store
