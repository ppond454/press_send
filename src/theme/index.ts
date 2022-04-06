import { extendTheme } from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools"

const config = {
    initialColorMode: "light",
    useSystemColorMode: false,
}
 
const styles ={
    global: props  => ( {
        body:{
            bg: mode("orange.100", "gray.900")(props),
            color: mode("gray.800", "orange.100")(props),
        }
    })
}

export const theme = extendTheme({
    config,
    styles,
})

