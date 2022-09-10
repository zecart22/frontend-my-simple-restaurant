import { VStack, Text, HStack } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { MdOutlineAddBox } from "react-icons/md";
import { CardCategoryName } from "../../components/Cards/CardCategory";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../services";

interface Category {
  name: string;
  id: string;
}

export const ListCategory = () => {
  const [categoryData, setCategoryData] = useState([]);

  const token = localStorage.getItem("@AcessToken");

  const loadCategory = useCallback(async () => {
    try {
      const response = await api.get(`/categories_list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategoryData(response.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    loadCategory();
  }, []);

  return (
    <>
      <Header />
      <VStack mt={50} spacing={5} justifyContent={"center"}>
        <Text fontSize={30}>Lista de Categorias</Text>

        {categoryData.length > 0 ? (
          <>
            {categoryData &&
              categoryData.map((category: Category) => (
                <CardCategoryName
                  title={category.name}
                  category_id={category.id}
                />
              ))}
          </>
        ) : (
          <Text>...carregando categorias</Text>
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
