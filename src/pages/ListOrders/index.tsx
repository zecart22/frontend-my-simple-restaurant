import { VStack, Text, HStack } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { MdOutlineAddBox } from "react-icons/md";
import { CardOrdersList } from "../../components/Cards/CardOrders";

export const ListOrders = () => {
  return (
    <>
      <Header />
      <VStack mt={50} spacing={5} justifyContent={"center"}>
        <Text fontSize={30}>Lista de Pedidos</Text>
        <CardOrdersList table={25} />
        <CardOrdersList table={15} />
        <CardOrdersList table={35} />
        <CardOrdersList table={55} />
        <HStack>
          <MdOutlineAddBox size={50} color={"theme.gray100"} />
          <Text fontSize={20} color={"theme.red"}>
            Abrir novo pedido
          </Text>
        </HStack>
      </VStack>
    </>
  );
};
