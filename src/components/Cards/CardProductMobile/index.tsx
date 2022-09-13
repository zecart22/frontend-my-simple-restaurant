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
  amount: number;
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
  amount,
}: CardProductsProps) => {
  const [isLargerThan850] = useMediaQuery("(min-width: 1281px)");

  const AppearFromRight = keyframes`
    from {opacity: 0;}
    to {transform: translateX(0px)}
  `;

  const token = localStorage.getItem("@AcessToken");
  const toast = useToast();
  const subTotal = Number(price) * amount;

  return (
    <>
      <Box
        mb={10}
        w={"350px"}
        border={"1px"}
        borderColor={"theme.gray100"}
        bg={"theme.white"}
        boxShadow={"lg"}
        _hover={{
          transform: "translateY(-2px)",
          border: "2px",
          borderColor: "#5B0101",
        }}
        transition="border 0.2s, ease 0s, transform 0.2s"
        borderRadius={20}
        justifyContent={"center"}
      >
        <VStack>
          <Text fontSize={20} fontWeight={"semibold"} mt={3}>
            {title}
          </Text>
          <VStack>
            <Text fontFamily={"Rock Salt, cursive"} color={"theme.red"}>
              Preço : R${price} ,00(unid)
            </Text>
            <Text color={"theme.red"}>Quantidade : {amount}</Text>
            <Text color={"theme.red"}>Subtotal : R${subTotal},00</Text>
          </VStack>

          <Image
            maxWidth={"100%"}
            w={"220px"}
            h={"220px"}
            objectFit={"contain"}
            src={image}
          />
        </VStack>
      </Box>
    </>
  );
};
