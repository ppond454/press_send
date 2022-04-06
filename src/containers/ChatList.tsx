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
} from "@chakra-ui/react"

import { SearchIcon } from "@chakra-ui/icons"
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
  return (
    <BoxMotion
      variants={VariantMotion}
      initial="hidden"
      exit="close"
      animate="visible"
      bg="#ceaf8c"
      w="400px"
      justifyContent="center"
      minW="250px"
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

      {[...Array(7)].map((_, i) => {
        return (
          <Flex
            cursor="pointer"
            m="auto"
            bg=""
            mx="5px"
            key={i}
            _hover={{ bg: "whiteAlpha.400", shadow: "inner" }}
            _focus={{ bg: "whiteAlpha.400", shadow: "inner" }}
            borderStyle="solid"
            h="70px"
          >
            <Box px="5px" my="auto">
              <Avatar />
            </Box>
            <Box my="auto" w="100vw">
              <Heading fontSize="16px">Name</Heading>
              <Text>{`mesaage • 22:00`}</Text>
            </Box>
          </Flex>
        )
      })}
    </BoxMotion>
  )
}

export default ChatList
