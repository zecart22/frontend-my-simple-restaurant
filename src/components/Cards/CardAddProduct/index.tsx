import {
  Box,
  HStack,
  Text,
  VStack,
  Image,
  useToast,
  useMediaQuery,
  keyframes,
  Button,
  Input,
} from "@chakra-ui/react";

import { api } from "../../../services";
import { useState } from "react";
import { IoIosAlert } from "react-icons/io";
import { Link } from "react-router-dom";
import { RiAddLine } from "react-icons/ri";
interface CardProductsProps {
  id: string;
  title: string;
  price: string;
  image: string;
  order_id: string;
}

interface AddItemProps {
  order_id: string;
  product_id: string;
  amount: number;
}

export const CardAddProduct = ({
  title,
  id,
  image,
  price,
  order_id,
}: CardProductsProps) => {
  const [amount, setAmount] = useState(0);

  const handleAmount = (e: any) => {
    setAmount(e.target.value);
  };

  const token = localStorage.getItem("@AcessToken");
  const toast = useToast();
  console.log(amount);
  console.log(`order id: ${order_id}`);

  const handleAddItem = async (data: AddItemProps) => {
    data = { order_id: order_id, product_id: id, amount: Number(amount) };
    console.log(data);
    api
      .post(`/order/add_item`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);

        toast({
          position: "top",
          title: "Yes...!",
          description: "Produto adicionado",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    /*  toast({
      position: "top",
      title: "Algo deu errado!! ",
      description: "tente novamente",
      status: "warning",
      duration: 3000,
      isClosable: true,
    }); */
  };

  return (
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
      <HStack>
        <Image
          ml={2}
          maxWidth={"100%"}
          w={"80px"}
          h={"80px"}
          objectFit={"contain"}
          src={image}
        />
        <VStack>
          <Text fontSize={10} fontWeight={"semibold"} mt={0}>
            {title}
          </Text>

          <Text color={"theme.red"} fontSize={10}>
            R${price} ,00
          </Text>
        </VStack>
        <Input
          placeholder={"qtd"}
          w={"60px"}
          type={"number"}
          onChange={handleAmount}
        />
        <Button
          rightIcon={<RiAddLine size={50} color={"red"} />}
          w={"30px"}
          bg={"none"}
          _hover={{
            bg: "white",
          }}
          onClick={handleAddItem as any}
        />
      </HStack>
    </Box>
  );
};
