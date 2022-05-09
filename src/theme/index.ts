import { extendTheme, ThemeConfig } from "@chakra-ui/react"

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
}

const styles = {
  global: {
    body: {
      bg: "orange.100",
      color: "gray.800",
    },
  },
}

export const theme = extendTheme({
  config,
  styles,
  fonts: {
    body: "Source Sans Pro",
    heading: "Playfair Display",
  },
})
