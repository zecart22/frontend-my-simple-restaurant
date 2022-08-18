import { VStack, Text, HStack } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { MdOutlineAddBox } from "react-icons/md";
import { CardProduct } from "../../components/Cards/CardProduct";
import img from "../../assets/images/lanche.png";

export const ListProducts = () => {
  return (
    <>
      <Header />
      <VStack mt={50} spacing={5} justifyContent={"center"}>
        <Text fontSize={30}>Lista de Produtos</Text>
        <CardProduct
          category={"Sanduiche"}
          description={
            "Este vem desde 1957: pão com gergelim, hambúrguer de carne grelhada no fogo, queijo derretido, alface, tomate, cebola, picles, ketchup e a maionese Texas"
          }
          id={"233"}
          image={img}
          price={"29,00"}
          protein={"carne"}
          size={"grande"}
          title={"Super X-Salada"}
        />
        <HStack mt={20}>
          <MdOutlineAddBox size={50} color={"theme.gray100"} />
          <Text fontSize={20} color={"theme.red"}>
            Criar novo produto
          </Text>
        </HStack>
      </VStack>
    </>
  );
};
