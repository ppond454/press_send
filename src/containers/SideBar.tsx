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
  Image,
  Flex,
  Avatar,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react"


import {useDispatch} from "react-redux"
import { signoutGoogle } from "../actions/authActions"
import CustomLink from "../containers/customLink"

type Props = {}

const SideBar = (props: Props) => {
  

  const dispatch= useDispatch()
  

  return (
    <Flex
      border="5px"
      borderColor="black"
      flexDirection="column"
      bg="whiteAlpha.600"
    >
      <CustomLink href="/">
        <Image h="30px" w="30px" src="../../asset/chatsIcon.svg" />
      </CustomLink>
      <CustomLink href="/addfriend">
        <Image h="30px" w="30px" src="../../asset/friendIcon.svg" />
      </CustomLink>
      <CustomLink href="/profile">
        <Image h="30px" w="30px" src="../../asset/personal.svg" />
      </CustomLink>
      <Spacer />
      <Menu>
        <MenuButton justifyContent="center" d="flex" p="20px">
          <Avatar borderRadius="50%" h="30px" w="30px" src="" />
        </MenuButton>
        <MenuList>
          <MenuItem
            as="button"
            onClick={() => {
              dispatch(signoutGoogle())
            }}
          >
            <Image w="20px" mx="10px" src="../../asset/LogoutIcon.svg" /> Log
            Out
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  )
}

export default SideBar
