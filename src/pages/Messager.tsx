import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Input,
  FormControl,
  FormLabel,
  Link,
  Button,
  InputGroup,
  InputRightElement,
  Divider,
  Image,
  Flex,
  Grid,
} from "@chakra-ui/react"
import { useEffect, useState, useRef } from "react"
import { Socket, io } from "socket.io-client"

import { fetchUsers } from "../actions/fetchUserActions"
import { selectUsers } from "../actions/selectUserActions"
import { fetch_chats } from "../actions/fetchChatsAction"

import { useAppSelector, useAppDispatch } from "../redux/Store"
import ChatsUser from "../containers/Chats"
import ChatList from "../containers/ChatList"
import { info } from "../types/userType"
import { fetch_lastMsg } from "../actions/lastMsgActions"

type Props = {}

const Messager = (props: Props) => {
  const { info } = useAppSelector((state) => state.fetchUser)
  const { userData } = useAppSelector((state) => state.authUser)
  const { selectUser } = useAppSelector((state) => state.fetchSelectUser)
  const { lastMsg } = useAppSelector((state) => state.fetchUnread)
  const dispatch = useAppDispatch()

  useEffect(() => {
     dispatch<any>(fetchUsers(userData?.uid as string))
  }, [])
  useEffect(() => {
     dispatch<any>(fetch_lastMsg(userData?.uid as string))
  }, [])

  return (
    <>
      <ChatList />
      <ChatsUser />
    </>
  )
}

export default Messager
