import React from "react"
import {
  Box,
  Button,
  Flex,
  Input,
  Image,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react"
import { ArrowRightIcon } from "@chakra-ui/icons"
import { Timestamp } from "firebase/firestore"
import { Socket } from "socket.io-client"

import { useAppSelector, useAppDispatch } from "../redux/Store"
import { Chats } from "../types/chatsType"
import { sendMsg } from "../functions/index"
import { addChats } from "../actions/fetchChatsAction"
import { encrypt, generateID } from "../functions/index"

type Props = {
  socket: Socket
}

const FormChat = ({ socket }: Props) => {
  const { selectUser } = useAppSelector((state) => state.fetchSelectUser)
  const { userData } = useAppSelector((state) => state.authUser)
  let text = React.useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()
  const { chats } = useAppSelector((state) => state.fetchChat)
  let id = React.useCallback(
    () => generateID(userData?.uid as string, selectUser?.uid as string),
    [selectUser?.uid, userData?.uid]
  )
  const handleSubmit = async () => {
    try {
      if (!text.current?.value) return
      let _id =id()
      let encry_text = encrypt(_id, text.current?.value)
      let chat: Chats = {
        from: userData?.uid as string,
        to: selectUser?.uid as string,
        text: encry_text,
        createdAt: Timestamp.fromDate(new Date()).toDate(),
        media: "" as string,
      }
      await sendMsg(chat)
      socket.emit("sendMessage", { ...chat })
      dispatch<any>(addChats(chats, chat))
      text.current.value = ""
    } catch (error) {
      throw error
    }
  }

  return (
    <Flex
      p="20px"
      justifyContent="center"
      bg="whiteAlpha.400"
      shadow="inner"
      w="full"
      position="sticky"
      h="10vh"
      top="100vh"
    >
      <Input
        as="input"
        type="text"
        ref={text}
        shadow="lg"
        pr="4.5rem"
        bg="whiteAlpha.900"
        borderRadius="30px"
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSubmit()
          }
        }}
      />

      <Button
        onClick={handleSubmit}
        size="md"
        borderRadius="50%"
        shadow="lg"
        mx="10px"
      >
        <ArrowRightIcon />
      </Button>
    </Flex>
  )
}
export default FormChat
