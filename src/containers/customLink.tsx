import React from "react"
import { Link, useLocation } from "react-router-dom"
import { Box } from "@chakra-ui/react"
import { motion } from "framer-motion"

interface Props {
  children: React.ReactNode
  href: string
}

const BoxMotion = motion(Box)

const customLink = ({ href, children, ...props }: Props) => {
  const location = useLocation()
  let active: boolean = href === location.pathname

  return (
    <Link to={href}>
      <BoxMotion
        id={href}
        ml="8px"
        cursor="pointer"
        justifyContent="center"
        d="flex"
        p="10px"
        bg={active ? "#ceaf8c" : undefined}
        initial={{
          opacity: 0,
        }}
        animate={{ opacity: 1 }}
        // layoutId={href}
        borderLeftRadius="30px"
      >
        {children}
      </BoxMotion>
    </Link>
  )
}

export default customLink
