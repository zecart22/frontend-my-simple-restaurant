import { VStack, Text, HStack, Box } from "@chakra-ui/react";

import { Header } from "../../components/Header";
import { EditProductForm } from "../../components/Forms/EditProduct";
import { Link, useParams } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
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
      <Box mb={5}>
        <VStack className={""} mt={30} spacing={6} justifyContent={"center"}>
          <VStack spacing={[10]}>
            <Link to={"/listproducts"}>
              <HStack>
                <AiOutlineArrowLeft />
                <Text fontSize={[15]} color={"theme.red"}>
                  Voltar para produtos
                </Text>
              </HStack>
            </Link>
            <Text fontSize={[30]}>Editar produto</Text>
          </VStack>
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
