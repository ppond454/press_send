import React from "react"
import { motion } from "framer-motion"
import {
  Box,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
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
  Avatar,
  Spacer,
} from "@chakra-ui/react"
import { HamburgerIcon } from "@chakra-ui/icons"
type Props = {}

const BoxMotion = motion(Box)
const transition = {
  type: "tween",
  ease: "easeOut",
  duration: 1,
}

const VariantMotion = {
  hidden: { x: "100vw", transition },
  visible: { x: 0, transition },
  close: {
    x: "100vw",
    transition,
  },
}

const Chats = (props: Props) => {
  return (
    <BoxMotion
      w="100%"
      bg="#5f3100"
      variants={VariantMotion}
      initial="hidden"
      animate="visible"
      exit="close"
    >
      <Flex bg="whiteAlpha.300" p="8px">
        <Box d="flex">
          <Avatar borderColor="whiteAlpha.400" />
          <Heading color="whiteAlpha.900" mx="10px" my="auto" size="sm">
            Name
          </Heading>
        </Box>
        <Spacer />
        <Box m="auto">
          <Menu>
            <MenuButton>
              <HamburgerIcon color="whiteAlpha.900" w="30px" h="30px" />
            </MenuButton>
            <MenuList>
              <MenuItem
                as="button"
                onClick={() => {
                  console.log("View")
                }}
              >
                View Profile
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </BoxMotion>
  )
}

export default Chats
