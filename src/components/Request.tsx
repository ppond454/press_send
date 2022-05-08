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
import { CheckIcon, CloseIcon } from "@chakra-ui/icons"
import { useAppSelector } from "../redux/Store"
import { acceptFriend, declineFriend } from "../functions/index"
import { info } from "../types/userType"

type Props = {}

const Request = (props: Props) => {
  const { info } = useAppSelector((state) => state.fetchUser)

  React.useEffect(() => {}, [])

  return (
    <Box w="100%" bg="whiteAlpha.400">
      {info?.requestedBy &&
        info.requestedBy.map((user) => {
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
                mr="10px"
                onClick={async () =>
                  await acceptFriend(
                    {
                      uid: info?.uid,
                      name: info?.name,
                      photoURL: info?.photoURL,
                    } as info,
                    {
                      uid: user.uid,
                      name: user.name,
                      photoURL: user.photoURL,
                    }
                  )
                }
              >
                <CheckIcon mr="5px" /> accept
              </Button>
              <Button
                bg="blackAlpha.600"
                color="white"
                _hover={{ bg: "blackAlpha.400" }}
                my="auto"
                onClick={async () =>
                  await declineFriend(
                    {
                      uid: info?.uid,
                      name: info?.name,
                      photoURL: info?.photoURL,
                    } as info,
                    {
                      uid: user.uid,
                      name: user.name,
                      photoURL: user.photoURL,
                    }
                  )
                }
              >
                <CloseIcon mr="5px" /> deny
              </Button>
              <Spacer />
            </Flex>
          )
        })}
    </Box>
  )
}

export default Request
