import {
  Text,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Box,
  HStack,
  VStack,
} from "@chakra-ui/react";

import { CardProduct } from "../../components/Cards/CardProduct";
import img from "../../assets/images/lanche.png";
import { RiAddLine } from "react-icons/ri";
import { CardProductMobile } from "../Cards/CardProductMobile";
import { RiDraftLine } from "react-icons/ri";
import { api } from "../../services";
import { useCallback, useState } from "react";

interface Products {
  id: string;
  title: string;
  description: string;
  price: string;
  size: string;
  protein: string;
  image: string;
  category: string;
}

interface ListIntesProps {
  products: Products[];
}

interface Order {
  id: string;
  table: number;
  status: boolean;
  draft: boolean;
  isDelivery: boolean;
  name: string;
  created_at: string;
  updated_at: string;
}

/* listar os produtos que estão no pedido */
/* adicionar produtos no pedido */
/* remover produtos que estão no pedido */
/* ver produtos já entregues */
/* mostrar quanto tempo demorou para entregar produto */
/* ver produtos em produção */
/* mostrar quanto o produto está em produção */

export const ModalOrder = ({
  id,
  table,
  created_at,
  updated_at,
  draft,
  isDelivery,
  name,
  status,
}: Order) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [orderData, setOrderData] = useState([]);

  const token = localStorage.getItem("@AcessToken");

  const loadOrderDetails = useCallback(async () => {
    try {
      const response = await api.get(`order/detail?order_id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      setOrderData(response.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  console.log(id);
  console.log(orderData);

  return (
    <>
      <Button
        onClick={onOpen}
        bg={"theme.blue"}
        border={"1px"}
        borderColor={"theme.gray50"}
        color={"red"}
        fontWeight={"bold"}
        h={"50px"}
      >
        Ver
      </Button>

      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        size={"2xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pedido número {id}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {draft ? (
              <>
                <VStack>
                  <Button
                    fontWeight={"extrabold"}
                    w={"300px"}
                    leftIcon={<RiAddLine size={40} />}
                    children={"Adicionar itens"}
                    color={"theme.white"}
                    bg={"theme.green"}
                    h={"50px"}
                    _hover={{
                      color: "black",
                      bg: "white",
                      border: "1px",
                      borderColor: "black",
                    }}
                    /*  onClick={loadAllOrder as any} */
                  />
                  <Button
                    w={"300px"}
                    children={"Ver todos itens"}
                    color={"theme.white"}
                    bg={"theme.orange"}
                    h={"50px"}
                    _hover={{
                      color: "black",
                      bg: "white",
                      border: "1px",
                      borderColor: "black",
                    }}
                    onClick={loadOrderDetails as any}
                  />
                  <Button
                    w={"300px"}
                    leftIcon={<RiDraftLine size={30} />}
                    children={"Ver itens em rascunho"}
                    color={"theme.white"}
                    bg={"theme.red"}
                    h={"50px"}
                    _hover={{
                      color: "black",
                      bg: "white",
                      border: "1px",
                      borderColor: "black",
                    }}
                    /*  onClick={loadAllOrder as any} */
                  />

                  <Button
                    w={"300px"}
                    children={"Ver itens em produção"}
                    color={"theme.white"}
                    bg={"theme.orange"}
                    h={"50px"}
                    _hover={{
                      color: "black",
                      bg: "white",
                      border: "1px",
                      borderColor: "black",
                    }}
                    /*  onClick={loadAllOrder as any} */
                  />
                  <Button
                    w={"300px"}
                    children={"Ver itens entregues"}
                    color={"theme.white"}
                    bg={"theme.orange"}
                    h={"50px"}
                    _hover={{
                      color: "black",
                      bg: "white",
                      border: "1px",
                      borderColor: "black",
                    }}
                    /*  onClick={loadAllOrder as any} */
                  />
                </VStack>
              </>
            ) : (
              <>
                <Button
                  w={"300px"}
                  children={"Ver todos itens"}
                  color={"theme.white"}
                  bg={"theme.orange"}
                  h={"50px"}
                  _hover={{
                    color: "black",
                    bg: "white",
                    border: "1px",
                    borderColor: "black",
                  }}
                  onClick={loadOrderDetails as any}
                />
              </>
            )}
          </ModalBody>
          <Box ml={[2, 10]}>
            {orderData.length > 0 ? (
              <>
                {orderData &&
                  orderData.map((order: any) => (
                    <CardProductMobile
                      category={order.product.category_id}
                      description={order.product.description}
                      image={order.product.image}
                      id={order.product.id}
                      price={order.product.price}
                      protein={order.product.protein}
                      size={order.product.hungryLevel}
                      title={order.product.name}
                    />
                  ))}
              </>
            ) : (
              <></>
            )}
          </Box>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Fechar mesa
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
