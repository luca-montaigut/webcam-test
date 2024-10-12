import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PictureCamera } from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider>
      <PictureCamera pictureFileName="test" />
    </ChakraProvider>
  </StrictMode>
);

// https://webcamtests.com/
