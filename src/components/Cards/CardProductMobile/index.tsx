import {
  Box,
  HStack,
  Text,
  VStack,
  Image,
  useToast,
  useMediaQuery,
  keyframes,
} from "@chakra-ui/react";

import { api } from "../../../services";
import { useState } from "react";
import { IoIosAlert } from "react-icons/io";
import { Link } from "react-router-dom";
interface CardProductsProps {
  id: string;
  title: string;
  description: string;
  price: string;
  size: string;
  protein: string;
  image: string;
  category: string;
}

export const CardProductMobile = ({
  title,
  description,
  id,
  image,
  price,
  protein,
  size,
  category,
}: CardProductsProps) => {
  const [isLargerThan850] = useMediaQuery("(min-width: 1281px)");

  const AppearFromRight = keyframes`
    from {opacity: 0;}
    to {transform: translateX(0px)}
  `;

  const token = localStorage.getItem("@AcessToken");
  const toast = useToast();

  return (
    <>
      <Box
        mb={10}
        w={"350px"}
        border={"1px"}
        borderColor={"theme.gray100"}
        borderLeft={"5px"}
        borderLeftColor={"theme.white"}
        bg={"theme.white"}
        boxShadow={"lg"}
        _hover={{
          transform: "translateY(-2px)",
          border: "2px",
          borderColor: "#5B0101",
        }}
        transition="border 0.2s, ease 0s, transform 0.2s"
        borderRadius={20}
      >
        <HStack>
          <Box
            w={"5px"}
            h="520px"
            bg={"theme.wine"}
            borderRadius={20}
            mt={4}
            ml={1}
          ></Box>
          <VStack>
            <VStack>
              <Text fontSize={20} fontWeight={"semibold"} mt={3}>
                {title}
              </Text>
              <Text fontFamily={"Rock Salt, cursive"} color={"theme.red"}>
                Preço : {price}
              </Text>
              <Image src={image} />
            </VStack>
            <VStack spacing={10}>
              <Text mb={5} w={"300px"} textAlign={"justify"}>
                {description}
              </Text>
              <VStack
                color={"theme.white"}
                fontWeight={"extrabold"}
                flexWrap={"wrap"}
                justifyContent={"center"}
              >
                <Box
                  boxShadow={"md"}
                  h={"25px"}
                  w={"320px"}
                  bg={"#ffa909"}
                  borderRadius={[40, 10, 40, 10]}
                  textAlign={"center"}
                >
                  Categoria: {category.toLocaleUpperCase()}
                </Box>
                <Box
                  boxShadow={"md"}
                  h={"25px"}
                  w={"320px"}
                  bg={"theme.orange"}
                  borderRadius={[40, 10, 40, 10]}
                  textAlign={"center"}
                >
                  Tamanho: {size.toLocaleUpperCase()}
                </Box>
                <Box
                  boxShadow={"md"}
                  h={"25px"}
                  w={"320px"}
                  bg={"theme.red"}
                  borderRadius={[40, 10, 40, 10]}
                  textAlign={"center"}
                >
                  Proteína: {protein.toLocaleUpperCase()}
                </Box>
              </VStack>
            </VStack>
          </VStack>
        </HStack>
      </Box>
    </>
  );
};
