import { StrictMode } from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { ChakraProvider } from "@chakra-ui/react"

import App from "./App"
import Store from "./redux/Store"
import { theme } from "./theme/index"

ReactDOM.render(
  <StrictMode>
    <Provider store={Store}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  </StrictMode>,
  document.getElementById("root")
)
