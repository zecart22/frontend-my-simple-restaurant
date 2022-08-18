import { VStack, Text, Input, Button } from "@chakra-ui/react";
import { Header } from "../../components/Header";

export const OpenOrder = () => {
  return (
    <>
      <Header />
      <VStack mt={50} spacing={5} justifyContent={"center"}>
        <Text fontSize={30}>Novo pedido</Text>
        <Input
          w={["270px", "380px", "400px", "600px"]}
          h={"50px"}
          placeholder={"digite o número da mesa"}
          border={"1px"}
          borderColor={"theme.gray50"}
          boxShadow={"md"}
        />
        <Input
          w={["270px", "380px", "400px", "600px"]}
          h={"50px"}
          placeholder={"digite o nome do cliente"}
          border={"1px"}
          borderColor={"theme.gray50"}
          boxShadow={"md"}
        />
        <Button
          w={["270px", "380px", "400px", "600px"]}
          h={"50px"}
          color={"theme.grafit"}
          children={"Abrir pedido"}
          bg={"theme.blue"}
        />
        <Text fontSize={20} color={"theme.red"}>
          Ver todos pedidos
        </Text>
      </VStack>
    </>
  );
};
