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
  Flex,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react"
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons"
import { motion } from "framer-motion"
import { useState, useRef, RefObject } from "react"
import { FocusableElement } from "@chakra-ui/utils"

import { isValidateEmail } from "../functions/index"
import { fetchUsers } from "../actions/fetchUserActions"
import { authGoogle, authGit, signup, authEmail } from "../actions/authActions"
import { useAppDispatch, useAppSelector } from "../redux/Store"
import { useDisclosure } from "@chakra-ui/react"
import React from "react"
import githubImg from "../public/githubLogo.png"
import googleImg from "../public/googleLogo.png"

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
  const [showErrorPwdCon, setShowErrorPwdCon] = useState<Boolean>(false)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = useRef<FocusableElement>()
  const finalRef = useRef<FocusableElement>()
  let signupName = useRef<HTMLInputElement>(null)
  let signupEmail = useRef<HTMLInputElement>(null)
  let signupPwd = useRef<HTMLInputElement>(null)
  let signupPwdCon = useRef<HTMLInputElement>(null)
  let [showErrorName, setshowErrorName] = useState<Boolean>(false)

  const dispatch = useAppDispatch()
  const { isFetching, isError, userData } = useAppSelector(
    (state) => state.authUser
  )

  const ModalSignup = () => {
    return (
      <>
        <Modal
          initialFocusRef={initialRef as RefObject<FocusableElement>}
          finalFocusRef={finalRef as RefObject<FocusableElement>}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create your account</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <Stack spacing={5}>
                  <BoxMotion>
                    <FormLabel htmlFor="email" fontSize="16">
                      Name
                    </FormLabel>
                    <Input
                      ref={signupName}
                      onChange={() => {
                        let name = signupName?.current?.value as string
                        if (name.length > 1 && name.length < 20)
                          setshowErrorName(false)
                        else setshowErrorName(true)
                      }}
                      isInvalid={showErrorName as boolean}
                      errorBorderColor="red.300"
                      isRequired
                      color="tomato"
                      placeholder="Enter your name"
                      _placeholder={{ opacity: 0.4, color: "inherit" }}
                    />
                  </BoxMotion>
                  <BoxMotion>
                    <FormLabel htmlFor="email" fontSize="16">
                      Email
                    </FormLabel>
                    <Input
                      ref={signupEmail}
                      onChange={() => {
                        setShowErrorEmail(
                          !isValidateEmail(signupEmail.current?.value as string)
                        )
                      }}
                      isInvalid={showErrorEmail as boolean}
                      errorBorderColor="red.300"
                      isRequired
                      color="tomato"
                      placeholder="examle.123@email.com"
                      _placeholder={{ opacity: 0.4, color: "inherit" }}
                    />
                  </BoxMotion>
                  <BoxMotion>
                    <FormLabel htmlFor="password" fontSize="16">
                      Password
                    </FormLabel>
                    <InputGroup>
                      <Input
                        ref={signupPwd}
                        onChange={() => {
                          let password = signupPwd.current?.value as string
                          if (password.length < 6) setShowErrorPwd(true)
                          if (password.length > 6) setShowErrorPwd(false)
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
                  <BoxMotion>
                    <FormLabel htmlFor="password" fontSize="16">
                      Confirm Password
                    </FormLabel>
                    <InputGroup>
                      <Input
                        ref={signupPwdCon}
                        onChange={() => {
                          let pwd = signupPwd.current?.value as string
                          let pwdCon = signupPwdCon.current?.value as string
                          if (pwd === pwdCon && !showErrorPwd)
                            return setShowErrorPwdCon(false)
                          else return setShowErrorPwdCon(true)
                        }}
                        isInvalid={showErrorPwdCon as boolean}
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
                </Stack>
              </FormControl>
            </ModalBody>

            <ModalFooter justifyContent="center">
              <Button
                colorScheme="blue"
                mr={3}
                onClick={async (
                  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                ) => {
                  e.preventDefault()
                  if (
                    showErrorName &&
                    showErrorEmail &&
                    showErrorPwd &&
                    showErrorPwdCon
                  )
                    return null

                  await dispatch<any>(
                    signup(
                      signupName.current?.value as string,
                      signupPwd.current?.value as string,
                      signupEmail.current?.value as string
                    )
                  )
                }}
              >
                Signup
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

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
        w={{base:"300px",md:"auto"}}
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
              <Link ml="5px" color="blue.400" href="#" onClick={onOpen}>
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
                id="email"
                value={email as string}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
                dispatch<any>(authEmail(E, P))
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
              onClick={async (
                e: React.MouseEvent<HTMLButtonElement, MouseEvent>
              ) => {
                e.preventDefault()
                await dispatch<any>(authGoogle())
              }}
            >
              <Image m={2} w="30px" h="30px" alt="google" src={googleImg} />
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
              <Image m={2} w="25px" h="25px" alt="github" src={githubImg} />
              Continue with Github
            </ButtonMotion>
          </Stack>
        </FormControl>
      </ContainerMotion>
      {ModalSignup()}
    </BoxMotion>
  )
}

export default Login
