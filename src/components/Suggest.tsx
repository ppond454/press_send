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
import { motion } from "framer-motion"

import { useAppSelector } from "../redux/Store"
import { requestFriend } from "../functions/index"
import { info, Users } from "../types/userType"

type Props = {}

const BoxMotion = motion(Box)

const transition = {
  type: "tween",
  ease: "easeOut",
  duration: 0.5,
}

const VariantMotion = {
  hidden: { y: "100vw", transition },
  visible: { y: 0, transition },
  close: {
    y: "100vw",
    transition,
  },
}

const Suggest = (props: Props) => {
  const { users, info } = useAppSelector((state) => state.fetchUser)

  React.useEffect(() => {}, [])

  const friends = (user: Users) => {
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
          bg="teal.500"
          color="white"
          _hover={{ bg: "teal.700" }}
          my="auto"
          onClick={async () =>
            await requestFriend(
              {
                uid: info?.uid,
                name: info?.name,
                photoURL: info?.photoURL,
              } as info,
              {
                uid: user.uid,
                name: user.name,
                photoURL: user.photoURL,
              } as info
            )
          }
        >
          add friend
        </Button>
        <Spacer />
      </Flex>
    )
  }

  const renderUsers = (user: Users, info: info[]) => {
    let j: number = 0
    for (j; j < info.length; j++) {
      if (user.uid === info[j].uid) {
        return user
      }
    }
  }

  return (
    <BoxMotion
      variants={VariantMotion}
      initial="hidden"
      exit="close"
      animate="visible"
      w="100%"
      bg="whiteAlpha.400"
    >
      {info &&
        users &&
        users?.map((user) => {
          let list = [
            ...info?.friend,
            ...info?.requestedBy,
            ...info?.requestedTo,
          ]
          return renderUsers(user, list) ? null : friends(user)
        })}
    </BoxMotion>
  )
}
export default Suggest
