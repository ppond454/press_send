import {Flex} from "@chakra-ui/react"

import SideBar from "../containers/SideBar"

interface Props {
  children: React.ReactNode
}

const index = ({ children }: Props) => {
  return (
    <Flex h="100vh" bg="#ceaf8c" >
      <SideBar />
      {children}
    </Flex>
  )
}

export default index
