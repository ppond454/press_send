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
  ModalOverlay,
  Modal,
  CircularProgress,
} from "@chakra-ui/react"
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons"
import { motion } from "framer-motion"
import { useState, useRef } from "react"

import { isValidateEmail } from "../functions/index"
import { authGoogle, authGit } from "../actions/authActions"
import { useAppDispatch, useAppSelector } from "../redux/Store"

const ButtonMotion = motion(Button)
const ContainerMotion = motion(Container)
const BoxMotion = motion(Box)
const HeadingMotion = motion(Heading)
const TextMotion = motion(Text)

const Login = () => {
  const [email, setEmail] = useState<String>("")
  const [password, setPassword] = useState<String>("")
  const [showPwd, setShowPwd] = useState<Boolean>(false)
  const [showErrorEmail, setShowErrorEmail] = useState<Boolean>(false)
  const [showErrorPwd, setShowErrorPwd] = useState<Boolean>(false)

  const dispatch = useAppDispatch()
  const { isFetching, isError } = useAppSelector((state) => state.authUser)

  return (
    <BoxMotion
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.45 } }}
      d="flex"
      justifyContent="center"
    >
      <Modal isOpen={isFetching} onClose={() => isError}>
        <ModalOverlay
          bg="none"
          backdropFilter="auto"
          backdropInvert="30%"
          backdropBlur="5px"
          d="flex"
          justifyContent="center"
        ></ModalOverlay>
      </Modal>

      <ContainerMotion
        style={{
          backdropFilter: "blur(10px)",
          textDecoration: "none",
        }}
        shadow="2xl"
        h="auto"
        w={500}
        bgColor="whiteAlpha.600"
        m="5%"
        borderRadius={15}
        justifyContent="center"
        p="30px"
      >
        <FormControl isRequired>
          <Stack spacing={5}>
            <HeadingMotion
              animate={{ x: "0", transition: { delay: 0.2 } }}
              initial={{ x: "-100vw" }}
              size="2xl"
              textAlign="center"
            >
              Press Send
            </HeadingMotion>
            <TextMotion
              animate={{ x: "0", transition: { delay: 0.4 }, opacity: 1 }}
              initial={{ x: "-100vw", opacity: 0 }}
              align="center"
              py="20px"
            >
              Don't have an account ?
              <Link ml="5px" color="blue.400" href="#">
                Sign up
              </Link>
            </TextMotion>
            <BoxMotion
              animate={{ x: "0", transition: { delay: 0.6 }, opacity: 1 }}
              initial={{ x: "-100vw", opacity: 0 }}
            >
              <FormLabel htmlFor="email" fontSize="16">
                Email
              </FormLabel>
              <Input
                value={email as string}
                onChange={(e) => {
                  setShowErrorEmail(!isValidateEmail(e.target.value))
                  setEmail(e.target.value)
                }}
                isInvalid={showErrorEmail as boolean}
                errorBorderColor="red.300"
                isRequired
                color="tomato"
                placeholder="examle.123@email.com"
                _placeholder={{ opacity: 0.4, color: "inherit" }}
              />
            </BoxMotion>
            <BoxMotion
              animate={{ x: "0", transition: { delay: 0.8 }, opacity: 1 }}
              initial={{ x: "-100vw", opacity: 0 }}
            >
              <FormLabel htmlFor="password" fontSize="16">
                Password
              </FormLabel>
              <InputGroup>
                <Input
                  value={password as string}
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  isInvalid={showErrorPwd as boolean}
                  errorBorderColor="red.300"
                  pr="4.5rem"
                  type={showPwd ? "text" : "password"}
                  placeholder="Enter your password"
                  isRequired
                  color="tomato"
                  _placeholder={{ opacity: 0.4, color: "inherit" }}
                />
                <InputRightElement width="4.5rem">
                  <BoxMotion
                    cursor="pointer"
                    h="1.75rem"
                    onClick={() => {
                      setShowPwd((prev) => !prev)
                    }}
                  >
                    {showPwd ? <ViewOffIcon /> : <ViewIcon />}
                  </BoxMotion>
                </InputRightElement>
              </InputGroup>
            </BoxMotion>
            <ButtonMotion
              animate={{ x: "0", transition: { delay: 1 } }}
              initial={{ x: "-100vw" }}
              _hover={{
                bgGradient: "linear(to-r, blue.300, orange.500, red.200)",
              }}
              _active={{
                bgGradient: "linear(to-r, blue.300, orange.500, red.200)",
              }}
              bgGradient="linear(to-r, blue.300, orange.500, red.200)"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              color="white"
              fontSize={18}
              h="50px"
              onClick={(e: React.MouseEvent<HTMLElement>) => {
                e.preventDefault()
                if (!email) setShowErrorEmail(true)
                else setShowErrorEmail(false)
                if (!password) setShowErrorPwd(true)
                else setShowErrorPwd(false)
                const E = email as string
                const P = password as string
                // dispatch<any>(signUserIn(E, P))
              }}
            >
              Sign In
            </ButtonMotion>
            <BoxMotion d="inline-flex" justifyContent="center" p="20px">
              <Divider borderColor="gray" w="100vw" m="auto" />
              <TextMotion mx="10px" color="gray">
                OR
              </TextMotion>
              <Divider borderColor="gray" w="100vw" m="auto" />
            </BoxMotion>
            <ButtonMotion
              animate={{ x: "0", transition: { delay: 1.2 } }}
              initial={{ x: "-100vw" }}
              _hover={{
                bg: "blue.600",
                color: "white",
              }}
              _active={{
                bg: "blue.600",
                color: "white",
              }}
              bg="blue.600"
              color="white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              fontSize={18}
              h="50px"
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                e.preventDefault()
                dispatch<any>(authGoogle())
              }}
            >
              <Image
                m={2}
                w="30px"
                h="30px"
                alt="google"
                src="../asset/googleLogo.png"
              />
              Continue with Google
            </ButtonMotion>
            <ButtonMotion
              animate={{ x: "0", transition: { delay: 1.45 } }}
              initial={{ x: "-100vw" }}
              _hover={{
                bg: "black",
                color: "white",
              }}
              _active={{
                bg: "black",
                color: "white",
              }}
              bg="black"
              color="white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              fontSize={18}
              h="50px"
              onClick={() => {
                dispatch<any>(authGit())
              }}
            >
              <Image
                m={2}
                w="25px"
                h="25px"
                alt="github"
                src="../asset/githubLogo.png"
              />
              Continue with Github
            </ButtonMotion>
          </Stack>
        </FormControl>
      </ContainerMotion>
    </BoxMotion>
  )
}

export default Login
