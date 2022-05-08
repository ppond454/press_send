import React from "react"
import {
  Box,
  Flex,
  Avatar,
  Text,
  Heading,
  Image,
  Spacer,
} from "@chakra-ui/react"
import { ChevronRightIcon } from "@chakra-ui/icons"
import { motion } from "framer-motion"

type Props = {
  option: number
  setOption: React.Dispatch<React.SetStateAction<Number>>
}

const BoxMoiton = motion(Box)

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

const FriendBar = (props: Props) => {
  const { option, setOption } = props
  return (
    <BoxMoiton
      variants={VariantMotion}
      initial="hidden"
      exit="close"
      animate="visible"
      bg="#ceaf8c"
      w="400px"
      justifyContent="center"
      minW="250px"
    >
      <Flex
        cursor={option === 1 ? "undefined" : "pointer"}
        m="auto"
        bg={option === 1 ? "whiteAlpha.400" : ""}
        mx="5px"
        borderStyle="solid"
        h="70px"
        borderRadius="10px"
        mt="10px"
        onClick={(e) => {
          e.preventDefault()
          setOption(1)
          localStorage.setItem("option", JSON.stringify(1))
        }}
      >
        <Box px="5px" my="auto" d="flex">
          <Avatar bg="whiteAlpha" src="../../asset/friendship.svg" />
        </Box>
        <Box my="auto" d="flex" w="100vw">
          <Spacer />

          <Heading fontSize="16px" my="auto">
            Friend
          </Heading>
          <Spacer />

          <ChevronRightIcon w="40px" h="40px" />
        </Box>
      </Flex>
      <Flex
        cursor={option === 2 ? "undefined" : "pointer"}
        m="auto"
        bg={option === 2 ? "whiteAlpha.400" : ""}
        mx="5px"
        borderStyle="solid"
        h="70px"
        borderRadius="10px"
        onClick={(e) => {
          e.preventDefault()
          setOption(2)
          localStorage.setItem("option", JSON.stringify(2))
        }}
      >
        <Box px="5px" my="auto">
          <Avatar bg="whiteAlpha" src="../../asset/suggest.svg" />
        </Box>
        <Box d="flex" my="auto" w="100vw">
          <Spacer />
          <Heading fontSize="16px" my="auto">
            Suggest Friend
          </Heading>
          <Spacer />
          <ChevronRightIcon w="40px" h="40px" />
        </Box>
      </Flex>
      <Flex
        cursor={option === 3 ? "undefined" : "pointer"}
        m="auto"
        bg={option === 3 ? "whiteAlpha.400" : ""}
        mx="5px"
        borderStyle="solid"
        h="70px"
        borderRadius="10px"
        onClick={(e) => {
          e.preventDefault()
          setOption(3)
          localStorage.setItem("option", JSON.stringify(3))
        }}
      >
        <Box px="5px" d="flex" my="auto">
          <Avatar bg="whiteAlpha" src="../../asset/request.svg" />
        </Box>
        <Box my="auto" d="flex" w="100vw">
          <Spacer />
          <Heading my="auto" fontSize="16px">
            Request
          </Heading>
          <Spacer />
          <ChevronRightIcon w="40px" h="40px" />
        </Box>
      </Flex>
    </BoxMoiton>
  )
}

export default FriendBar
