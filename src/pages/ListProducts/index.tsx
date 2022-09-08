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
  const [isLargerThan850] = useMediaQuery("(min-width: 1281px)");

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
    setCategoryId(size);
  };

  const handleProtein = (protein: any) => {
    setCategoryId(protein);
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
      .get(`/product/size?protein=${protein}`, {
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

  return (
    <>
      <Header />
      {isLargerThan850 ? (
        <>
          <HStack spacing={20} mt={10}>
            <VStack ml={10}>
              <Button
                w={["378px"]}
                h={"50px"}
                color={"theme.white"}
                bg={"theme.red"}
                onClick={TakeAllProducts}
                _hover={{
                  color: "black",
                  bg: "white",
                  border: "1px",
                  borderColor: "black",
                }}
                children={"Ver todos os produtos"}
              />

              <HStack>
                <Select
                  w={["270px"]}
                  h={"50px"}
                  placeholder={"Ver produtos por categoria"}
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
                  bg={"theme.red"}
                  h={"50px"}
                  onClick={(e) => TakeProductsByCategory(category_id)}
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
              <HStack>
                <Select
                  w={["270px"]}
                  h={"50px"}
                  placeholder={"Ver produtos por tamanho"}
                  fontWeight={"extrabold"}
                  border={"1px"}
                  borderColor={"theme.gray50"}
                  boxShadow={"md"}
                  onChange={(e) => handleSize(e.target.value)}
                >
                  <option value={"pequeno"}>Pequeno</option>
                  <option value={"médio"}>Médio</option>
                  <option value={"grande"}>Grande</option>
                </Select>
                <Button
                  color={"theme.white"}
                  bg={"theme.red"}
                  h={"50px"}
                  onClick={(e) => TakeProductsBySize(size)}
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
              <HStack>
                <Select
                  w={["270px"]}
                  h={"50px"}
                  placeholder={"Ver produtos por proteina"}
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
                  bg={"theme.red"}
                  h={"50px"}
                  onClick={(e) => TakeProductsByProtein(protein)}
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
            <VStack spacing={8} justifyContent={"center"}>
              <HStack spacing={10}>
                <Text fontSize={30}>Lista de Produtos</Text>

                <Link to={"/createproduct"}>
                  <HStack>
                    <MdOutlineAddBox size={50} color={"theme.gray100"} />
                    <Text fontSize={20} color={"theme.red"}>
                      Criar novo produto
                    </Text>
                  </HStack>
                </Link>
              </HStack>

              {productData.length > 0 ? (
                <>
                  {productData &&
                    productData.map((product: ProductsData) => (
                      <CardProduct
                        category={"Sanduiche"}
                        description={product.description}
                        id={product.id}
                        image={product.image}
                        price={product.price}
                        protein={product.protein}
                        size={product.hungryLevel}
                        title={product.name}
                        productByCategory={productData}
                        setProductByCategory={setProductData}
                      />
                    ))}
                </>
              ) : (
                <>
                  <Text>Selecione como deseja listar os produtos</Text>
                </>
              )}
            </VStack>
          </HStack>
        </>
      ) : (
        <>
          <VStack mt={10}>
            <VStack>
              <Button
                w={["308px"]}
                h={"50px"}
                color={"theme.white"}
                bg={"theme.red"}
                /* onClick={(e) => TakeProducts(category_id)} */
                _hover={{
                  color: "black",
                  bg: "white",
                  border: "1px",
                  borderColor: "black",
                }}
                children={"Ver todos os produtos"}
              />

              <HStack>
                <Select
                  w={["200px"]}
                  h={"50px"}
                  placeholder={"Ver produtos por categoria"}
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
                  bg={"theme.red"}
                  h={"50px"}
                  onClick={(e) => TakeProductsByCategory(category_id)}
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
              <HStack>
                <Select
                  w={["200px"]}
                  h={"50px"}
                  placeholder={"Ver produtos por tamanho"}
                  fontWeight={"extrabold"}
                  border={"1px"}
                  borderColor={"theme.gray50"}
                  boxShadow={"md"}
                  onChange={(e) => handleSize(e.target.value)}
                >
                  <option value={"Pequeno"}>Pequeno</option>
                  <option value={"Médio"}>Médio</option>
                  <option value={"Grande"}>Grande</option>
                </Select>
                <Button
                  color={"theme.white"}
                  bg={"theme.red"}
                  h={"50px"}
                  /* onClick={(e) => TakeProducts(category_id)} */
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
              <HStack>
                <Select
                  w={["200px"]}
                  h={"50px"}
                  placeholder={"Ver produtos por proteina"}
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
                  bg={"theme.red"}
                  h={"50px"}
                  onClick={(e) => TakeProductsByCategory(category_id)}
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
            <VStack spacing={5} justifyContent={"center"}>
              <Text fontSize={30}>Lista de Produtos</Text>
              <HStack>
                <MdOutlineAddBox size={30} color={"theme.gray100"} />
                <Link to={"/createproduct"}>
                  <Text fontSize={15} color={"theme.red"}>
                    Criar novo produto
                  </Text>
                </Link>
              </HStack>

              {productData.length > 0 ? (
                <>
                  {productData &&
                    productData.map((product: ProductsData) => (
                      <CardProduct
                        category={"Sanduiche"}
                        description={product.description}
                        id={product.id}
                        image={product.image}
                        price={product.price}
                        protein={product.protein}
                        size={product.hungryLevel}
                        title={product.name}
                        productByCategory={productData}
                        setProductByCategory={setProductData}
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
      )}
    </>
  );
};
