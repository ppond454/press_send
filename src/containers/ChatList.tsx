import React from "react"
import { motion } from "framer-motion"

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
  InputLeftAddon,
  Avatar,
  Spacer,
} from "@chakra-ui/react"

import { SearchIcon } from "@chakra-ui/icons"
// import Moment from "react-moment"
import moment from "moment"

import { useAppSelector, useAppDispatch } from "../redux/Store"
import { selectUsers } from "../actions/selectUserActions"
import { fetch_lastMsg } from "../actions/lastMsgActions"
import { fetch_chats } from "../actions/fetchChatsAction"

import { info, Users } from "../types/userType"
import { lastMsg, IlastMsgUser } from "../types/unreadChatsTypes"
import { generateID, decrypt } from "../functions/index"

type Props = {}

const transition = {
  type: "tween",
  ease: "easeOut",
  duration: 0.5,
}

const VariantMotion = {
  hidden: { y: "-100vw", transition },
  visible: { y: 0, transition },
  close: {
    y: "-100vw",
    transition,
  },
}

const BoxMotion = motion(Box)

const ChatList = (props: Props) => {
  const dispatch = useAppDispatch()
  const { selectUser } = useAppSelector((state) => state.fetchSelectUser)
  const { info } = useAppSelector((state) => state.fetchUser)
  const { userData } = useAppSelector((state) => state.authUser)
  const { lastMsg } = useAppSelector((state) => state.fetchUnread)
  // console.log(lastMsg)

  const renderList = (info: IlastMsgUser, i: number, myUid: string) => {
    let id = generateID(myUid, info.uid)
    let text = decrypt(id, info.lastMsg.text)

    return (
      <Flex
        cursor="pointer"
        m="auto"
        bg={selectUser?.uid === info.uid ? "whiteAlpha.400" : ""}
        mx="5px"
        key={i}
        _hover={{ bg: "whiteAlpha.100", shadow: "inner" }}
        _focus={{ bg: "whiteAlpha.100", shadow: "inner" }}
        borderStyle="solid"
        h="70px"
        borderRadius="10px"
        onClick={async (e) => {
          e.preventDefault()
          await dispatch<any>(
            selectUsers({
              name: info.name,
              photoURL: info.photoURL,
              uid: info.uid,
            })
          )
          // await dispatch<any>(fetch_chats(myUid, info.uid))
        }}
      >
        <Box px="5px" my="auto">
          <Avatar src={info.photoURL} />
        </Box>
        <Box my="auto" w="100vw">
          <Heading fontSize="16px">{info.name}</Heading>
          {/* {unreadUser && <small>{unreadUser.text}</small>} */}
          {myUid === info.lastMsg.from ? (
            <Flex>
              <Flex>
                <Text fontSize="14px">{text}</Text>
              </Flex>
              <Spacer />
              <Flex mr="25px">
                <Text fontSize="14px">
                  {moment(info?.lastMsg.createdAt).fromNow()}
                </Text>
              </Flex>
            </Flex>
          ) : (
            <>
              {info.lastMsg.unread ? (
                <Flex>
                  <Flex>
                    <Text fontSize="14px">{text}</Text>
                  </Flex>
                  <Spacer />
                  <Flex mr="25px">
                    <Text fontSize="14px">
                      {moment(info?.lastMsg.createdAt).fromNow()}
                    </Text>
                  </Flex>
                </Flex>
              ) : (
                <Flex>
                  <Flex>
                    <Text fontSize="14px">{text}</Text>
                  </Flex>
                  <Spacer />
                  <Flex mr="25px">
                    <Text fontSize="14px">
                      {moment(info?.lastMsg.createdAt).fromNow()}
                    </Text>
                  </Flex>
                </Flex>
              )}
            </>
          )}
        </Box>
      </Flex>
    )
  }

  return (
    <>
      <BoxMotion
        variants={VariantMotion}
        initial="hidden"
        exit="close"
        animate="visible"
        bg="#ceaf8c"
        w="400px"
        justifyContent="center"
        // minW="250px"
        overflowY="auto"
      >
        <Heading size="lg" m="10px">
          Chat
        </Heading>
        <InputGroup bg="whiteAlpha.400" m={{ base: "5px", md: "15px" }} w="">
          <InputLeftAddon>
            <SearchIcon />
          </InputLeftAddon>
          <Input placeholder="Search" />
        </InputGroup>
        {lastMsg &&
          lastMsg.map((info, i) => {
            if (info.uid === userData?.uid) return null
            return renderList(info, i, userData?.uid as string)
          })}
      </BoxMotion>
    </>
  )
}

export default ChatList
