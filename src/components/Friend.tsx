import React from "react"
import {
  Box,
  Flex,
  Avatar,
  Button,
  Spacer,
  Heading,
  Text,
} from "@chakra-ui/react"
import { ChatIcon, Search2Icon } from "@chakra-ui/icons"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

import { useAppSelector, useAppDispatch } from "../redux/Store"
import { selectUsers } from "../actions/selectUserActions"
import { fetch_chats } from "../actions/fetchChatsAction"

type Props = {}

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

const Friend = (props: Props) => {
  const { info } = useAppSelector((state) => state.fetchUser)
  const { chats } = useAppSelector((state) => state.fetchChat)
  const { userData } = useAppSelector((state) => state.authUser)

  const dispatch = useAppDispatch()
  let Navigate = useNavigate()

  // console.log("user :",userData);

  return (
    <BoxMotion
      variants={VariantMotion}
      initial="hidden"
      exit="close"
      animate="visible"
      w="100%"
      bg="whiteAlpha.400"
    >
      {info?.friend.map((user) => {
        return (
          <Flex
            key={user.uid}
            boxShadow="xl"
            justifyContent="center"
            p="10px"
            bg="whiteAlpha.400"
          >
            <Spacer />
            <Box>
              <Avatar src={user.photoURL || ""}></Avatar>
            </Box>
            <Box mx="10px" w="250px" my="auto">
              <Heading size="small">{user.name}</Heading>
              {/* <Box h="10px"></Box> */}
            </Box>
            <Button
              bg="teal.600"
              color="white"
              _hover={{ bg: "teal.400" }}
              my="auto"
              mr="10px"
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                e.preventDefault()
                Navigate(`/profile/${user.uid}`,{ replace: true })
              }}
            >
              <Search2Icon mr="5px" /> view profile
            </Button>
            <Button
              bg="blue.500"
              color="white"
              _hover={{ bg: "blue.400" }}
              my="auto"
              onClick={async (
                e: React.MouseEvent<HTMLButtonElement, MouseEvent>
              ) => {
                e.preventDefault()
                await dispatch<any>(selectUsers(user))
                // await dispatch<any>(fetch_chats(info.uid, user.uid))
                Navigate("/", { replace: true })
              }}
            >
              <ChatIcon mr="5px" /> Chat
            </Button>
            <Spacer />
          </Flex>
        )
      })}
    </BoxMotion>
  )
}

export default Friend
