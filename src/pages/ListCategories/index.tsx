import { VStack, Text, HStack } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { MdOutlineAddBox } from "react-icons/md";
import { CardCategoryName } from "../../components/Cards/CardCategory";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CategoryContext } from "../../contexts/CategoriesContext";

export const ListCategory = () => {
  const { category } = useContext(CategoryContext);

  return (
    <>
      <Header />
      <VStack mt={50} spacing={5} justifyContent={"center"}>
        <Text fontSize={30}>Lista de Categorias</Text>

        {category.length > 0 ? (
          <>
            {category &&
              category.map((category) => (
                <CardCategoryName title={category.name} />
              ))}
          </>
        ) : (
          <VStack>
            <Text fontSize={"5xl"} fontFamily={"Rock Salt, cursive"}>
              Ops nada por aqui
            </Text>
            <Link to={"/createcategory"}>
              <Text fontSize={10}>Clique aqui para criar uma categoria</Text>
            </Link>
          </VStack>
        )}
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
