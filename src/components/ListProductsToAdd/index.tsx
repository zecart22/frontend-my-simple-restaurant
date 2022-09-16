import {
  VStack,
  Text,
  HStack,
  Select,
  Button,
  useToast,
  Box,
  useMediaQuery,
} from "@chakra-ui/react";

import { MdOutlineAddBox } from "react-icons/md";

import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../services";
import { GiHamburger } from "react-icons/gi";
import { BiCategory } from "react-icons/bi";
import { TbMeat } from "react-icons/tb";
import { CardAddProduct } from "../../components/Cards/CardAddProduct";

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

interface Order {
  order_id: string;
}

export const ListProductsToAdd = ({ order_id }: Order) => {
  const [categoryData, setCategoryData] = useState([]);

  const [productData, setProductData] = useState([]);

  const [category_id, setCategoryId] = useState("");

  const [size, setSize] = useState("");
  const [protein, setProtein] = useState("");

  console.log(category_id);

  const token = localStorage.getItem("@AcessToken");

  const handleCategoryId = (id: any) => {
    setCategoryId(id);
  };

  const handleSize = (size: any) => {
    setSize(size);
  };

  const handleProtein = (protein: any) => {
    setProtein(protein);
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

  const TakeProductsByCategory = (category_id: any) => {
    console.log(`category :${category_id}`);
    api
      .get(`/category/product?category_id=${category_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        setProductData(response.data);
      })
      .catch((err) => console.log(err));
  };

  const TakeAllProducts = () => {
    api
      .get(`/product_list`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        setProductData(response.data);
      })
      .catch((err) => console.log(err));
  };

  const TakeProductsBySize = (size: any) => {
    api
      .get(`/product/size?size=${size}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        setProductData(response.data);
      })
      .catch((err) => console.log(err));
  };

  const TakeProductsByProtein = (protein: any) => {
    api
      .get(`/product/protein?protein=${protein}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        setProductData(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    TakeProductsByCategory(category_id);
  }, []);

  console.log();

  return (
    <>
      <>
        <VStack mt={10}>
          <VStack>
            <Button
              w={["308px"]}
              h={"50px"}
              color={"theme.white"}
              bg={"theme.orange"}
              onClick={TakeAllProducts}
              _hover={{
                color: "black",
                bg: "white",
                border: "1px",
                borderColor: "black",
              }}
              children={"Todos os produtos"}
            />

            <HStack>
              <Select
                w={["250px"]}
                h={"50px"}
                placeholder={"produtos por categoria"}
                fontWeight={"extrabold"}
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
                bg={"theme.orange"}
                h={"50px"}
                onClick={(e) => TakeProductsByCategory(category_id)}
                _hover={{
                  color: "black",
                  bg: "white",
                  border: "1px",
                  borderColor: "black",
                }}
              >
                <BiCategory size={20} />
              </Button>
            </HStack>
            <HStack>
              <Select
                w={["250px"]}
                h={"50px"}
                placeholder={"produtos por tamanho"}
                fontWeight={"extrabold"}
                border={"1px"}
                borderColor={"theme.gray50"}
                boxShadow={"md"}
                onChange={(e) => handleSize(e.target.value)}
              >
                <option value={"pequeno"}>Pequeno</option>
                <option value={"medio"}>Médio</option>
                <option value={"grande"}>Grande</option>
              </Select>
              <Button
                color={"theme.white"}
                bg={"theme.orange"}
                h={"50px"}
                _hover={{
                  color: "black",
                  bg: "white",
                  border: "1px",
                  borderColor: "black",
                }}
                onClick={(e) => TakeProductsBySize(size)}
              >
                <GiHamburger size={20} />
              </Button>
            </HStack>
            <HStack>
              <Select
                w={["250px"]}
                h={"50px"}
                placeholder={"produtos por proteina"}
                fontWeight={"extrabold"}
                border={"1px"}
                borderColor={"theme.gray50"}
                boxShadow={"md"}
                onChange={(e) => handleProtein(e.target.value)}
              >
                <option value={"carne"}>Carne</option>
                <option value={"frango"}>Frango</option>
                <option value={"nenhuma"}>Nenhuma</option>
              </Select>
              <Button
                color={"theme.white"}
                bg={"theme.orange"}
                h={"50px"}
                onClick={(e) => TakeProductsByProtein(protein)}
                _hover={{
                  color: "black",
                  bg: "white",
                  border: "1px",
                  borderColor: "black",
                }}
              >
                <TbMeat size={20} />
              </Button>
            </HStack>
          </VStack>
          <VStack spacing={5} justifyContent={"center"}>
            <Text fontSize={30}>Lista de Produtos</Text>

            {productData.length > 0 ? (
              <>
                {productData &&
                  productData.map((product: ProductsData) => (
                    <CardAddProduct
                      title={product.name}
                      id={product.id}
                      image={product.image}
                      price={product.price}
                      order_id={order_id}
                    />
                  ))}
              </>
            ) : (
              <>
                <Text>Selecione como deseja listar os produtos</Text>
              </>
            )}
          </VStack>
        </VStack>
      </>
    </>
  );
};
