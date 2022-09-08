import { VStack, Text, HStack, Box } from "@chakra-ui/react";

import { Header } from "../../components/Header";
import { EditProductForm } from "../../components/Forms/EditProduct";
import { Link, useParams } from "react-router-dom";

import { api } from "../../services";

import { useCallback, useEffect, useState } from "react";

export const EditProduct = () => {
  const { id } = useParams();

  const token = localStorage.getItem("@AcessToken");

  const [productData, setProductData] = useState([]);

  const loadProduct = useCallback(async () => {
    try {
      const response = await api.get(`/product/id?product_id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProductData(response.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    loadProduct();
  }, []);

  console.log(productData);
  const { price, description, category_id, hungryLevel, image, name, protein } =
    productData;

  return (
    <>
      <Header />
      <Box h={"1070px"}>
        <VStack className={""} mt={30} spacing={6} justifyContent={"center"}>
          <HStack spacing={[70, 100]}>
            <Text fontSize={[20, 30]}>Editar produto</Text>
            <Link to={"/listproducts"}>
              <Text fontSize={[15, 20]} color={"theme.red"}>
                Voltar para produtos
              </Text>
            </Link>
          </HStack>
          {productData.length === 0 ? (
            <></>
          ) : (
            <>
              <EditProductForm
                name={name}
                description={description}
                category_id={category_id}
                hungryLevel={hungryLevel}
                price={price}
                protein={protein}
                file={image}
                id={productData.id}
              />
            </>
          )}
        </VStack>
      </Box>
    </>
  );
};
