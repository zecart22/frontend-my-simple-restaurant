import { Heading, Box, Flex, VStack, Center } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { CardCategory } from "../../components/Cards/CardCategory";
import { CardOrders } from "../../components/Cards/CardOrders";

import { CardProductSection } from "../../components/CardProductSection";

export const Dashboard = () => {
  return (
    <>
      <Header />
      <Center>
        <VStack mt={100} spacing={5}>
          <CardCategory />
          <CardOrders />
          <CardProductSection />
        </VStack>
      </Center>
    </>
  );
};
