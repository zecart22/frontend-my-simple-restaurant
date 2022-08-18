import { VStack, Text, Input, Button } from "@chakra-ui/react";
import { Header } from "../../components/Header";

export const CreateCategory = () => {
  return (
    <>
      <Header />
      <VStack mt={50} spacing={5} justifyContent={"center"}>
        <Text fontSize={30}>Nova Categoria</Text>
        <Input
          w={["270px", "380px", "400px", "600px"]}
          h={"50px"}
          placeholder={"digite o nome da nova categoria"}
          border={"1px"}
          borderColor={"theme.gray50"}
          boxShadow={"md"}
        />
        <Button
          w={["270px", "380px", "400px", "600px"]}
          h={"50px"}
          color={"theme.grafit"}
          children={"Criar Categoria"}
          bg={"theme.yellow"}
        />
        <Text fontSize={20} color={"theme.red"}>
          Ver todas categorias
        </Text>
      </VStack>
    </>
  );
};
