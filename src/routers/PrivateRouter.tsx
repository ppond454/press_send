import { Routes, Route, Navigate , useLocation } from "react-router-dom"
import Messager from "../pages/Messager"
import Profile from "../pages/Profile"
import ProfileFriend from "../pages/Profile/ProfileFriend"
import AddFriend from "../pages/AddFriend"

import { AnimatePresence } from "framer-motion"

const PrivateRouter = () => {
  let localtion = useLocation()
  return (
    <>
      <AnimatePresence exitBeforeEnter initial={false}>
        <Routes  key={localtion.pathname} location={localtion} >
          <Route path="/" element={<Messager />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:friend" element={<ProfileFriend />} />
          <Route path="/friend" element={<AddFriend />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default PrivateRouter
