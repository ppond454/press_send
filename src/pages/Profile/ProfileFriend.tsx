import React from "react"
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
import { motion } from "framer-motion"
import { useParams ,useNavigate } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../../redux/Store"
import { Users } from "../../types/userType"

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

const ProfileFriend = (props: Props) => {
  const {friend} = useParams()
  const navigate = useNavigate()
  const [infoFriend ,setInfoFriend] = React.useState<Users>()
  const { users } = useAppSelector((state) => state.fetchUser)

  React.useEffect(() => {
    const info = users.find((user) => user.uid === friend)
    if(!info) return navigate("/")
    setInfoFriend(info)
 
  }, [friend])

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
            src={infoFriend?.photoURL || ""}
          />
        </Flex>
        <Spacer />
        <Box m="auto" mr="30px">
          <Heading maxW="300px" size="md">
            {infoFriend?.name}
          </Heading>
          <Flex>
            <strong>Created At :</strong>
            <Text ml="5px">{moment(infoFriend?.createdAt).format("ll")}</Text>{" "}
          </Flex>
          <Flex>
            <strong>All Friend </strong>
            <Text ml="20px">
              {`${infoFriend?.friend.length} mutual friend`}
              {infoFriend?.friend && infoFriend?.friend.length > 1 && "s"}
            </Text>
          </Flex>

        </Box>
      </BoxMotion>
    </>
  )
}
export default ProfileFriend
