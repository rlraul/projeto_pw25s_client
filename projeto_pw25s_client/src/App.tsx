import { ChakraProvider } from "@chakra-ui/react"
import { BaseRoutes } from "./routes/BaseRoutes"

function App() {
  return (
    <ChakraProvider>
      <BaseRoutes />
    </ChakraProvider>
  );
}

export default App
