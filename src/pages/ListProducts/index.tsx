import {
  VStack,
  Text,
  HStack,
  Select,
  Button,
  useToast,
} from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { MdOutlineAddBox } from "react-icons/md";
import { CardProduct } from "../../components/Cards/CardProduct";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../services";

interface Category {
  name: string;
  id: string;
}

interface ProductsData {
  id: string;
  name: string;
  description: string;
  price: string;
  hungryLevel: string;
  protein: string;
  image: string;
  category: string;
}

export const ListProducts = () => {
  const [categoryData, setCategoryData] = useState([]);

  const [productByCategory, setProductByCategory] = useState([]);

  const [category_id, setCategoryId] = useState("");

  console.log(category_id);

  const token = localStorage.getItem("@AcessToken");

  const handleCategoryId = (id: any) => {
    setCategoryId(id);
  };

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

  const TakeProducts = (category_id: any) => {
    console.log(`category :${category_id}`);
    api
      .get(`/category/product?category_id=${category_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        setProductByCategory(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    TakeProducts(category_id);
  }, []);

  return (
    <>
      <Header />
      <VStack mt={50} spacing={5} justifyContent={"center"}>
        <Text fontSize={30}>Lista de Produtos</Text>
        <VStack>
          <HStack>
            <MdOutlineAddBox size={50} color={"theme.gray100"} />
            <Link to={"/createproduct"}>
              <Text fontSize={20} color={"theme.red"}>
                Criar novo produto
              </Text>
            </Link>
          </HStack>
          <HStack>
            <Select
              w={["270px", "380px", "400px", "800px"]}
              h={"50px"}
              placeholder={"Selecione uma categoria"}
              border={"1px"}
              borderColor={"theme.gray50"}
              boxShadow={"md"}
              onChange={(e) => handleCategoryId(e.target.value)}
            >
              {categoryData &&
                categoryData.map((category: Category) => (
                  <option value={category.id}>{category.name}</option>
                ))}
            </Select>
            <Button
              color={"theme.white"}
              bg={"theme.red"}
              h={"50px"}
              onClick={(e) => TakeProducts(category_id)}
              _hover={{
                color: "black",
                bg: "white",
                border: "1px",
                borderColor: "black",
              }}
            >
              Procurar
            </Button>
          </HStack>
        </VStack>

        {productByCategory.length > 0 ? (
          <>
            {productByCategory &&
              productByCategory.map((product: ProductsData) => (
                <CardProduct
                  category={"Sanduiche"}
                  description={product.description}
                  id={product.id}
                  image={product.image}
                  price={product.price}
                  protein={product.protein}
                  size={product.hungryLevel}
                  title={product.name}
                  productByCategory={productByCategory}
                  setProductByCategory={setProductByCategory}
                />
              ))}
          </>
        ) : (
          <>
            <Text>Opss...nenhum produto nessa categoria .</Text>
          </>
        )}
      </VStack>
    </>
  );
};
