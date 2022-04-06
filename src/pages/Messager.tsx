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
  Flex
} from "@chakra-ui/react"


import Chats from "../containers/Chats"
import ChatList from "../containers/ChatList"

type Props = {}

const Messager = (props: Props) => {
  return (
    <>
      <ChatList/>
      <Chats/>
    </>
  )
}

export default Messager