import { Heading, Box, Flex, VStack } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { CardCategory } from "../../components/Cards/CardCategory";
import { CardOrders } from "../../components/Cards/CardOrders";
import { CardProductSection } from "../../components/Cards/CardProduct";

export const Dashboard = () => {
  return (
    <Box justifyContent={"center"}>
      <Header />
      <VStack mt={100} spacing={5}>
        <CardCategory />
        <CardOrders />
        <CardProductSection />
      </VStack>
    </Box>
  );
};
