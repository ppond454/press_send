import React, { useEffect } from "react"
import {
  Box,
  Container,
  Avatar,
  Flex,
  Heading,
  Text,
  Spacer,
} from "@chakra-ui/react"
import moment from "moment"
import {motion} from "framer-motion"

import { useAppDispatch, useAppSelector } from "../../redux/Store"

type Props = {}

const BoxMotion = motion(Box)

const transition = {
  type: "tween",
  ease: "easeOut",
  duration: 0.5,
}

const VariantMotion = {
  hidden: { x: "100vw", transition },
  visible: { x: 0, transition },
  close: {
    x: "100vw",
    transition,
  },
}

const Profile = (props: Props) => {
  const { userData } = useAppSelector((state) => state.authUser)
  const { info } = useAppSelector((state) => state.fetchUser)
  
  return (
    <>
      <BoxMotion
        d="flex"
        shadow="xl"
        borderRadius="15px"
        mt="3rem"
        mx="auto"
        w="500px"
        h="250px"
        bg="whiteAlpha.500"
        p="20px"

        whileHover={{ scale: 1.05 }}
        variants={VariantMotion}
        initial="hidden"
        animate="visible"
        exit="close"
      >
        <Flex m="auto" ml="20px">
          <Avatar
            border="2px"
            borderColor="whiteAlpha.900"
            h="150px"
            w="150px"
            src={userData?.photoURL || ""}
          />
        </Flex>
        <Spacer />
        <Box m="auto" mr="30px">
          <Heading maxW="300px" size="md">{info?.name || userData?.displayName}</Heading>
          <Flex>
            <strong>Email :</strong> <Text ml="5px">{userData?.email|| "no specified"}</Text>{" "}
          </Flex>
          <Flex>
            <strong>Created At :</strong>
            <Text ml="5px">{moment(info?.createdAt).format("ll")}</Text>{" "}
          </Flex>
          <Flex>
            <strong>All Friend</strong>
            <Text ml="5px">
              {`${info?.friend.length} mutual friend`}
              {info?.friend && info?.friend.length > 1 && "s"}
            </Text>
          </Flex>
          <Flex>
            <strong>Account Verified</strong>
            <Text ml="5px">
              {userData?.emailVerified  ? "Yes" : "No"}
            </Text>
          </Flex>

        </Box>
      </BoxMotion>
    </>
  )
}
export default Profile
