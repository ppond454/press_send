import { StrictMode } from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { ChakraProvider } from "@chakra-ui/react"
import { PersistGate } from "redux-persist/es/integration/react"

import App from "./App"
import Store, { Persistor } from "./redux/Store"
import { theme } from "./theme/index"

ReactDOM.render(
  <StrictMode>
    <Provider store={Store}>
      <PersistGate persistor={Persistor} loading={null} >
        <ChakraProvider theme={theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
  document.getElementById("root")
)
