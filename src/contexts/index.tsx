import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";
import { AuthProvider } from "./AuthContext";
import { CategoriesProvider } from "./CategoriesContext";
import { OrdersProvider } from "./OrdersContext";

import theme from "../style/theme";

interface IAppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: IAppProviderProps) => (
  <AuthProvider>
    <CategoriesProvider>
      <OrdersProvider>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </OrdersProvider>
    </CategoriesProvider>
  </AuthProvider>
);
