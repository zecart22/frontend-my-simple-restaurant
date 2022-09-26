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
  item_id: string;
  draft: boolean;
  orderData: any;
  setTotal: any;
  loadOrderDetails: () => void;
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
  item_id,
  draft,
  orderData,
  setTotal,
  loadOrderDetails,
}: CardProductsProps) => {
  const [wantDelete, setWantDelete] = useState(false);
  const handleWantDelete = () => {
    setWantDelete(true);
  };

  if (wantDelete) {
    setTimeout(() => {
      setWantDelete(false);
    }, 3000);
  }

  const token = localStorage.getItem("@AcessToken");
  const toast = useToast();
  let subTotal = Number(price) * amount;

  const arraySubtotal = orderData.map(
    (order: any) => Number(order.product.price) * order.amount
  );

  const len = arraySubtotal.length;
  console.log(len);

  const sumTotal = (len: any) => {
    let acc = 0;
    for (let i = 0; i < len; i++) {
      acc = acc + arraySubtotal[i];
      console.log(acc);
    }
    return acc;
  };

  const total = sumTotal(len);
  setTotal(total);

  const handleDelete = async () => {
    await api
      .delete("/order/remove_item?item_id=" + item_id, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        loadOrderDetails();
        setWantDelete(false);
        toast({
          position: "top",
          title: "Yes...!",
          description: "Produto deletado",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Box
        mb={10}
        w={"300px"}
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
          {draft ? (
            <>
              {wantDelete ? (
                <>
                  <HStack>
                    <IoIosAlert color={"red"} size={30} />
                    <Text
                      as="button"
                      color={"theme.red"}
                      mb={5}
                      onClick={handleDelete as any}
                    >
                      Confirmar
                    </Text>
                  </HStack>
                </>
              ) : (
                <>
                  <Text
                    as="button"
                    color={"theme.red"}
                    mb={5}
                    onClick={handleWantDelete as any}
                  >
                    Excluir
                  </Text>
                </>
              )}
            </>
          ) : (
            <></>
          )}
        </VStack>
      </Box>
    </>
  );
};
