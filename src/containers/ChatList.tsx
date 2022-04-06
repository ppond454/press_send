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
} from "@chakra-ui/react"
type Props = {}

const BoxMotion = motion(Box)

const ChatList = (props: Props) => {
  return (
    <BoxMotion
      bg="#ceaf8c"
      w="400px"
    ></BoxMotion>
  )
}

export default ChatList
