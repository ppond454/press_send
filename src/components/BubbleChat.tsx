import { Box, Flex, Text, Container } from "@chakra-ui/react"
import React from "react"
import moment from "moment"

import { useAppSelector } from "../redux/Store"
import { Chats } from "../types/chatsType"
import { generateID, decrypt } from "../functions/index"

type Props = {}

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

const BubbleChat = (props: Props) => {
  moment.updateLocale("en", { relativeTime: CONFIG_NEW })
  const { chats } = useAppSelector((state) => state.fetchChat)
  const { userData } = useAppSelector((state) => state.authUser)
  const { selectUser } = useAppSelector((state) => state.fetchSelectUser)

  let chatMock = chats as Chats[]
  
  return (
    <>
      {chatMock.length > 0 &&
        chatMock.map((chat, i) => {
          let text = chat.text  
          return (
            <Flex
              key={i}
              p="10px"
              shadow="xl"
              borderRadius="10px"
              my="10px"
              color="white"
              bg={chat.from === userData?.uid ? "#ffeed4" : "#473417"}
              alignSelf={
                chat.from === userData?.uid ? "flex-end" : "flex-start"
              }
              justifySelf="flex-start"
              mx="10px"
            >
              <Box color={chat.from === userData?.uid ? "#473417" : "#ffeed4"}>
                <Box>
                  <Text
                    fontWeight="normal"
                    float={chat.from === userData?.uid ? "right" : "left"}
                    fontSize="15px"
                    maxW="200px"
                  >
                    {text}
                  </Text>
                </Box>
                <Box>
                  <Text
                    fontWeight="light"
                    as="i"
                    float={chat.from === userData?.uid ? "right" : "left"}
                    fontSize="12px"
                  >
                    {moment(chat.createdAt).fromNow()}
                  </Text>
                </Box>
              </Box>
            </Flex>
          )
        })}
    </>
  )
}
export default BubbleChat

