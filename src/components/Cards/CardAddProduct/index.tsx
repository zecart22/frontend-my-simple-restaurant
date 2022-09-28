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
  useDisclosure,
} from "@chakra-ui/react";

import { Input } from "../../Input";
import { api } from "../../../services";
import { useState } from "react";
import { IoIosAlert } from "react-icons/io";
import { Link } from "react-router-dom";
import { RiAddLine } from "react-icons/ri";
import { yupResolver } from "@hookform/resolvers/yup";
import { ModalError } from "../../ModalError";
import { useForm } from "react-hook-form";
import * as yup from "yup";
interface CardProductsProps {
  id: string;
  title: string;
  price: string;
  image: string;
  order_id: string;
  loadOrderDetails: () => void;
}

interface AddItemProps {
  order_id: string;
  product_id: string;
  amount: number;
}

const addItemSchema = yup.object().shape({
  amount: yup.number().required("obrigatório"),
});

export const CardAddProduct = ({
  title,
  id,
  image,
  price,
  order_id,
  loadOrderDetails,
}: CardProductsProps) => {
  const {
    isOpen: isModalFailOpen,
    onOpen: onModalFailOpen,
    onClose: onModalFailClose,
  } = useDisclosure();

  const [amount, setAmount] = useState(0);

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<AddItemProps>({
    resolver: yupResolver(addItemSchema),
  });

  const token = localStorage.getItem("@AcessToken");
  const toast = useToast();
  console.log(amount);
  console.log(`order id: ${order_id}`);

  const handleAddItem = async (data: AddItemProps) => {
    const { amount } = data;

    setAmount(amount);
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
        loadOrderDetails();
      })
      .catch((err) => {
        console.log(err);
        onModalFailOpen();
        setTimeout(onModalFailClose, 1500);
      });
  };

  return (
    <>
      <ModalError
        isOpen={isModalFailOpen}
        onClose={onModalFailClose}
        title={"Ops..."}
        message={"Algo deu errado, tente novamente"}
      />

      <Box
        mb={10}
        w={"360px"}
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
        <HStack mb={2} mt={2}>
          <Image
            ml={2}
            maxWidth={"100%"}
            w={"80px"}
            h={"80px"}
            objectFit={"contain"}
            src={image}
          />

          <Box flexDirection={"column"} textAlign={"left"}>
            <Text fontSize={10} fontWeight={"semibold"} mt={0} w={"150px"}>
              {title}
            </Text>

            <Text color={"theme.red"} fontSize={10}>
              R${price} ,00
            </Text>
          </Box>
          <HStack>
            <Input
              w={["50px"]}
              placeholder={""}
              error={errors.amount}
              label={"Qtd"}
              {...register("amount")}
            />
            <Button
              color={"white"}
              fontSize={30}
              w={"35px"}
              h={"72px"}
              bg={"theme.red"}
              _hover={{
                bg: "black",
              }}
              onClick={handleSubmit(handleAddItem as any)}
            >
              +
            </Button>
          </HStack>
        </HStack>
      </Box>
    </>
  );
};
