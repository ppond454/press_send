import { Flex, Text } from "@chakra-ui/react"
import React from "react"

import { useAppSelector } from "../redux/Store"
import { Chats } from "../types/chatsType"
import { generateID, decrypt } from "../functions/index"

type Props = {}

const BubbleChat = (props: Props) => {
  const { chats } = useAppSelector((state) => state.fetchChat)
  const { userData } = useAppSelector((state) => state.authUser)
  const { selectUser } = useAppSelector((state) => state.fetchSelectUser)
  const scrollRef = React.createRef<HTMLDivElement>()

  React.useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 750)
  }, [chats])

  React.useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 750)
  }, [])

  let chatMock = chats as Chats[]

  let id :string = generateID(userData?.uid as string, selectUser?.uid as string)

  return (
    <>
      {chatMock.length > 0 &&
        chatMock.map((chat, i) => {
          return (
            <Flex
              ref={scrollRef}
              key={i}
              p="10px"
              shadow="inner"
              borderRadius="30px"
              my="10px"
              color="white"
              bg={
                chat.from === userData?.uid
                  ? "blackAlpha.500"
                  : "blackAlpha.800"
              }
              alignSelf={
                chat.from === userData?.uid ? "flex-end" : "flex-start"
              }
              w="100px"
              mx="10px"
            >
              <Text>{decrypt(id, chat.text)}</Text>
              {/* <Moment toNow >1976-04-19T12:59-0500</Moment> */}
            </Flex>
          )
        })}
    </>
  )
}
export default BubbleChat
