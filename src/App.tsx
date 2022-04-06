import { useAppSelector} from "./redux/Store"
import {useEffect} from "react"

import Layout from "./layouts/index"
import PrivateRouter from "./routers/PrivateRouter"
import PublicRouter from "./routers/PublicRouter"


function App() {
  const { isLogin } = useAppSelector(state => state.authUser)
  useEffect(() => {
    if (isLogin) {
      console.log("isLogin")
    } else {
      console.log("notLogin")
    }

  },[isLogin])

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
