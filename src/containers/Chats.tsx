import React from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import {
  Box,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
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
  Avatar,
  Spacer,
  Center,
  Container,
  AvatarBadge,
} from "@chakra-ui/react"
import { HamburgerIcon } from "@chakra-ui/icons"
import { Socket, io } from "socket.io-client"

import FormChat from "../components/FormChat"
import BubbleChat from "../components/BubbleChat"
import { info } from "../types/userType"
import { Chats } from "../types/chatsType"
import { fetch_chats, addChats } from "../actions/fetchChatsAction"
import { useAppSelector, useAppDispatch } from "../redux/Store"
import { decrypt, generateID } from "../functions"

type Props = {
  // socket: Socket
}

const BoxMotion = motion(Box)
const transition = {
  type: "tween",
  ease: "easeOut",
  duration: 0.5,
}

const VariantMotion = {
  hidden: { x: "100vw", transition },
  visible: { x: 0, transition },
  close: {
    x: "100vw",
    transition,
  },
}

const ChatsUser = (props: Props) => {
  const ENDPOINT =
    import.meta.env.VITE_SOCKET_ENDPOINT || ("ws://localhost:4000/" as string)
  const dispatch = useAppDispatch()
  const socket = React.useRef<Socket>()
  const [arrivalMessage, setArrivalMessage] = React.useState<Chats | null>(null)
  const { chats } = useAppSelector((state) => state.fetchChat)
  const { userData } = useAppSelector((state) => state.authUser)
  const { selectUser } = useAppSelector((state) => state.fetchSelectUser)
  const { users } = useAppSelector((state) => state.fetchUser)
  const Navigate = useNavigate()
  const id = React.useCallback(
    () => generateID(userData?.uid as string, selectUser?.uid as string),
    [selectUser?.uid, userData?.uid]
  )

  React.useEffect(() => {
    socket.current = io(ENDPOINT as string)
    socket.current.on("getMessage", (data: Chats) => {
      decrypt(id(), data.text).then((text) =>
        setArrivalMessage({ ...data, text })
      )
    })
    return () => setArrivalMessage(null)
  }, [])

  React.useEffect(() => {
    arrivalMessage &&
      selectUser?.uid === arrivalMessage.from &&
      dispatch<any>(addChats(chats, arrivalMessage))
  }, [arrivalMessage, selectUser?.uid])

  React.useEffect(() => {
    if (selectUser?.uid)
      return dispatch<any>(
        fetch_chats(userData?.uid as string, selectUser?.uid as string)
      )
  }, [selectUser?.uid, userData?.uid])

  React.useEffect(() => {
    let userId = userData?.uid as string
    socket.current?.emit("addUser", userId)
  }, [userData?.uid])

  const noMessages = () => {
    return (
      <Center mt="200px">
        <Box textAlign="center">
          <Image alt="messages" src="../../asset/messages.svg" />
          <Text>let's start Chat</Text>
        </Box>
      </Center>
    )
  }

  const ChatBar = (selectUser: info) => {
    const data = users.find((val) => selectUser.uid === val.uid)
    return (
      <Flex bg="whiteAlpha.300" shadow="xl" p="10px" h="8vh">
        <Box d="flex">
          <Avatar src={selectUser?.photoURL} borderColor="whiteAlpha.400">
            <AvatarBadge
              borderColor={data?.isOnline ? "green.100" : "papayawhip"}
              bg={data?.isOnline ? "green.500" : "tomato"}
              boxSize="1em"
            />
          </Avatar>
          <Heading
            color="blackAlpha.900"
            mx="10px"
            my="auto"
            fontSize={{ base: "sm", md: "lg" }}
          >
            {selectUser?.name}
          </Heading>
        </Box>
        <Spacer />
        <Box m="auto">
          <Menu>
            <MenuButton>
              <HamburgerIcon color="blackAlpha.900" w="30px" h="30px" />
            </MenuButton>
            <MenuList>
              <MenuItem
                as="button"
                onClick={() => {
                  Navigate(`/profile/${selectUser.uid}`, { replace: true })
                }}
              >
                View Profile
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    )
  }
  return (
    <>
      <BoxMotion
        flexdirection="column"
        w="100%"
        // bg="#5f3100"
        bg="whiteAlpha.400"
        variants={VariantMotion}
        initial="hidden"
        animate="visible"
        exit="close"
        shadow="2xl"
        minH="100%"
      >
        {selectUser && ChatBar(selectUser)}
        {chats.length === 0 && noMessages()}
        {chats.length > 0 && (
          <Box d="flex" flexDirection="column" overflowY="auto" h="82vh">
            {<BubbleChat />}
            <AlwaysScrollToBottom />
          </Box>
        )}
        {selectUser && <FormChat socket={socket.current as Socket} />}
      </BoxMotion>
    </>
  )
}

export default ChatsUser

const AlwaysScrollToBottom = () => {
  const elementRef = React.useRef<HTMLDivElement>()
  React.useEffect(() =>
    elementRef.current?.scrollIntoView({ behavior: "smooth" })
  )
  return <div ref={elementRef as React.MutableRefObject<HTMLDivElement>} />
}
