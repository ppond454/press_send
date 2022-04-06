import {useEffect} from "react"
import {auth} from "./config/firebase"

import { useAppSelector , useAppDispatch} from "./redux/Store"
import Layout from "./layouts/index"
import PrivateRouter from "./routers/PrivateRouter"
import PublicRouter from "./routers/PublicRouter"


function App() {
  const dispatch = useAppDispatch() 
  const { isLogin } = useAppSelector(state => state.authUser)

  return (
    <>
      {isLogin ? (
        <Layout>
          <PrivateRouter />
        </Layout>
      ) : (
        <PublicRouter />
      )}
    </>
  )
}

export default App
