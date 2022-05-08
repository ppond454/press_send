import React, { useEffect, useState } from "react"
import { Box } from "@chakra-ui/react"

import { useAppDispatch, useAppSelector } from "../redux/Store"
import { fetchUsers } from "../actions/fetchUserActions"
import FriendBar from "../containers/FriendBar"
import Friend from "../components/Friend"
import Suggestion from "../components/Suggest"
import Request from "../components/Request"

type Props = {}

const AddFriend = (props: Props) => {
  const dispatch = useAppDispatch()
  // const { users, isFetching } = useAppSelector((state) => state.fetchUser)
  const { userData } = useAppSelector((state) => state.authUser)
  const [option, setOption] = useState<Number>(1)

  useEffect(() => {
    let select: number = Number(localStorage.getItem("option")) || 1
    setOption(select)
    return dispatch<any>(fetchUsers(userData?.uid as string))
  }, [userData?.uid])

  const renderContent = React.useCallback(() => {
    switch (option) {
      case 1:
        return <Friend />
      case 2:
        return <Suggestion />
      case 3:
        return <Request />
      default:
        return <Friend />
    }
  }, [option])

  return (
    <>
      <FriendBar option={option as number} setOption={setOption} />
      {renderContent()}
    </>
  )
}
export default AddFriend
