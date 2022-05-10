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
  AvatarBadge,
  Badge,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
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
import { generateID, unreadUpdate } from "../functions/index"

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

const CONFIG_NEW = {
  future: "in %s",
  past: "%s ago",
  s: "secs",
  ss: "%ss",
  m: "a min",
  mm: "%dm",
  h: "1h",
  hh: "%dh",
  d: "a day",
  dd: "%dd",
  M: "month",
  MM: "%dM",
  y: "year",
  yy: "%dY",
}

const ChatList = (props: Props) => {
  moment.updateLocale("en", { relativeTime: CONFIG_NEW })
  const dispatch = useAppDispatch()
  const { selectUser } = useAppSelector((state) => state.fetchSelectUser)
  const { info, users } = useAppSelector((state) => state.fetchUser)
  const { userData } = useAppSelector((state) => state.authUser)
  const { lastMsg, isFetching } = useAppSelector((state) => state.fetchUnread)
  // console.log(lastMsg)

  const renderList = (info: IlastMsgUser, i: number, myUid: string) => {
    let id = generateID(myUid, info.uid)
    const data = users.find((user) => user.uid === info.uid)
    // let text = info.lastMsg.text
    return (
      <Flex
        cursor="pointer"
        m="auto"
        bg={selectUser?.uid === info.uid ? "whiteAlpha.400" : ""}
        mx="5px"
        key={i}
        _hover={
          selectUser?.uid === info.uid
            ? {}
            : { bg: "whiteAlpha.100", shadow: "inner" }
        }
        _focus={{ bg: "whiteAlpha.100", shadow: "inner" }}
        borderStyle="solid"
        h={{ base: "100px", md: "70px" }}
        borderRadius="10px"
        onClick={async (e) => {
          e.preventDefault()
          await dispatch<any>(
            selectUsers(myUid ,{
              name: info.name,
              photoURL: info.photoURL,
              uid: info.uid,
            })
          )
        }}
      >
        <Box px="5px" my="auto">
          <Skeleton
            borderRadius="50%"
            startColor="#ffeed4"
            endColor=""
            isLoaded={!isFetching}
          >
            <Avatar src={info.photoURL}>
              <AvatarBadge
                borderColor={data?.isOnline ? "green.100" : "papayawhip"}
                bg={data?.isOnline ? "green.500" : "tomato"}
                boxSize="1em"
              />
            </Avatar>
          </Skeleton>
        </Box>
        <Box my="auto" w="100vw">
          <Flex>
            <Skeleton
              borderRadius="20px"
              startColor="#ffeed4"
              endColor=""
              isLoaded={!isFetching}
            >
              <Heading ml="5px" fontSize={{ base: "12px", md: "md" }}>
                {info.name}
              </Heading>
            </Skeleton>
            <Spacer />
            <Badge
              d={
                info.lastMsg.from !== myUid && info.lastMsg.unread
                  ? "flex"
                  : "none"
              }
              mr="1"
              borderRadius="10px"
              colorScheme="green"
              justifyContent="center"
            >
              New
            </Badge>
          </Flex>
          <Flex
            mt="10px"
            d={{ base: "block", md: "flex" }}
            fontWeight={
              info.lastMsg.from !== myUid && info.lastMsg.unread ? "bold" : ""
            }
          >
            <Flex ml="10px" w="50%">
              <Skeleton
                borderRadius="20px"
                startColor="#ffeed4"
                endColor=""
                isLoaded={!isFetching}
              >
                <Text fontSize="14px">
                  {`${info.lastMsg.text.substring(0, 10)}`} {info.lastMsg.text.length > 9 && "..."}
                </Text>
              </Skeleton>
            </Flex>
            <Spacer />
            <Flex>
              <Skeleton
                borderRadius="20px"
                startColor="#ffeed4"
                endColor=""
                isLoaded={!isFetching}
              >
                <Text fontSize="14px" mr="4px">
                  {moment(info?.lastMsg.createdAt).fromNow()}
                </Text>
              </Skeleton>
            </Flex>
          </Flex>
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
          lastMsg.map( (info, i) => {
            if (info.uid === userData?.uid) return null
            return renderList(info, i, userData?.uid as string)
          })}
      </BoxMotion>
    </>
  )
}

export default ChatList
