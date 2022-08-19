import { VStack, Text, HStack } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { MdOutlineAddBox } from "react-icons/md";
import { CardCategoryName } from "../../components/Cards/CardCategory";
import { Link } from "react-router-dom";

export const ListCategory = () => {
  return (
    <>
      <Header />
      <VStack mt={50} spacing={5} justifyContent={"center"}>
        <Text fontSize={30}>Lista de Categorias</Text>
        <CardCategoryName title={"Sobremesas"} />
        <CardCategoryName title={"Sanduiches"} />
        <CardCategoryName title={"Porção"} />
        <CardCategoryName title={"Combo"} />
        <CardCategoryName title={"Bebidas"} />
        <Link to={"/createcategory"}>
          <HStack>
            <MdOutlineAddBox size={50} color={"theme.gray100"} />
            <Text>Adicionar categorias</Text>
          </HStack>
        </Link>
      </VStack>
    </>
  );
};
