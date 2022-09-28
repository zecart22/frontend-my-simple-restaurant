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
  Toast,
  useToast,
} from "@chakra-ui/react";

import { CardProductMobile } from "../Cards/CardProductMobile";
import { IoIosAlert } from "react-icons/io";
import { RiDraftLine } from "react-icons/ri";
import { api } from "../../services";
import { useEffect, useState } from "react";
import { ModalAddItem } from "../modalAddItem";
import { ModalError } from "../ModalError";
import { MdDeleteSweep } from "react-icons/md";
import moment, { Moment } from "moment";

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
  loadDraftOrder: () => void;
  loadOpenOrder: () => void;
}

interface Data {
  order_id: string;
}

export const ModalOrder = ({
  id,
  table,
  created_at,
  updated_at,
  draft,
  isDelivery,
  name,
  status,
  loadDraftOrder,
  loadOpenOrder,
}: Order) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isModalFailOpen,
    onOpen: onModalFailOpen,
    onClose: onModalFailClose,
  } = useDisclosure();

  const [orderData, setOrderData] = useState([]);

  const [message, setMessage] = useState("");

  const [titleMessage, setTitleMessage] = useState("");

  const [total, setTotal] = useState(0);

  const token = localStorage.getItem("@AcessToken");

  const [wantDelete, setWantDelete] = useState(false);
  const handleWantDelete = () => {
    setWantDelete(true);
  };

  if (wantDelete) {
    setTimeout(() => {
      setWantDelete(false);
    }, 3000);
  }

  const Close = () => {
    onClose();
  };

  const handleDelete = async () => {
    await api
      .delete(`/order?order_id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        setWantDelete(false);
        loadDraftOrder();
        Close();
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
        setTitleMessage("Não foi possível deletar pedido!");
        setMessage(
          "Esse pedido ainda tem produtos, exclua todos e tente novamente"
        );
        onModalFailOpen();
        setTimeout(onModalFailClose, 3000);
      });
  };

  const loadOrderDetails = () => {
    api
      .get(`order/detail?order_id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        setOrderData(response.data);
      })
      .catch((err) => console.log(err));
  };

  const toast = useToast();

  const handleSetToProdution = async (data: Data) => {
    data = { order_id: id };
    console.log(data);
    api
      .put(`/order/send`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        loadOpenOrder();
        loadOrderDetails();

        toast({
          position: "top",
          title: "Tudo certo",
          description: "Produto em produção",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        Close();
      })
      .catch((err) => {
        console.log(err);
        setTitleMessage("Ops...");
        setMessage("Pedido vazio, adicione 1 item para e tente novamente.");
        onModalFailOpen();
        setTimeout(onModalFailClose, 3000);
      });
  };

  const handleSetToConcluids = async (data: Data) => {
    data = { order_id: id };
    console.log(data);
    api
      .put(`/order/conclud`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);

        toast({
          position: "top",
          title: "Tudo certo",
          description: "Produto editado",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
        setTitleMessage("Ops algo deu errado");
        setMessage("Tente novamente");
        onModalFailOpen();
        setTimeout(onModalFailClose, 3000);
      });
  };

  useEffect(() => {
    loadOrderDetails();
  }, []);

  let createdAt = moment(created_at).format("DD/MM/YYYY hh:mm");
  let createdAtHour = moment(created_at).format("hh:mm");

  let updatedAt = moment(updated_at).format("DD/MM/YYYY hh:mm");
  let updatedAtHour = moment(updated_at).format("hh:mm");

  console.log(orderData);

  return (
    <>
      <ModalError
        isOpen={isModalFailOpen}
        onClose={onModalFailClose}
        title={titleMessage}
        message={message}
      />
      {draft ? (
        <>
          <Button
            onClick={onOpen}
            bg={"theme.blue"}
            border={"1px"}
            borderColor={"theme.gray50"}
            color={"theme.black"}
            fontWeight={"bold"}
            h={"50px"}
          >
            Ver
          </Button>
        </>
      ) : !draft && !status ? (
        <>
          <Button
            onClick={onOpen}
            bg={"theme.orange"}
            border={"2px"}
            borderColor={"theme.gray50"}
            color={"black"}
            fontWeight={"bold"}
            h={"50px"}
          >
            Ver
          </Button>
        </>
      ) : !draft && status ? (
        <>
          <Button
            onClick={onOpen}
            bg={"#089605"}
            border={"2px"}
            borderColor={"theme.gray50"}
            color={"theme.black"}
            fontWeight={"bold"}
            h={"50px"}
            _hover={{
              color: "black",
              bg: "white",
            }}
          >
            Ver
          </Button>
        </>
      ) : (
        <></>
      )}

      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        size={"sm"}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <VStack textAlign={"left"}>
              <Text>Detalhes do Pedido</Text>
              <HStack>
                <Text fontSize={12}>MESA: {table}</Text>
                <Text fontSize={12}>CLIENTE: {name.toUpperCase()}</Text>
              </HStack>
              <HStack>
                <Text fontSize={10} color={"theme.wine"}>
                  ABERTO EM: {createdAt}
                </Text>
                <Text fontSize={10} color={"theme.wine"}>
                  ÁS: {createdAtHour} horas
                </Text>
              </HStack>
              <HStack color={"theme.rad"}>
                <Text fontSize={10} color={"theme.wine"}>
                  ATUALIZADO EM: {updatedAt}
                </Text>
                <Text fontSize={10} color={"theme.wine"}>
                  ÁS: {updatedAtHour} horas
                </Text>
              </HStack>

              <Text fontSize={13} color={"gray"}>
                ID: {id}
              </Text>

              <Text fontSize={20} color={"red"}>
                TOTAL EM PEDIDOS: R${total},00
              </Text>
            </VStack>
          </ModalHeader>
          <ModalCloseButton onClick={Close} />
          <ModalBody justifyContent={"center"}>
            {draft ? (
              <>
                <VStack>
                  <Button
                    fontSize={30}
                    fontWeight={"extrabold"}
                    w={"300px"}
                    children={"Produzir"}
                    color={"theme.black"}
                    bg={"theme.green"}
                    h={"50px"}
                    _hover={{
                      color: "black",
                      bg: "white",
                      border: "1px",
                      borderColor: "black",
                    }}
                    onClick={handleSetToProdution as any}
                  />
                  <ModalAddItem
                    order_id={id}
                    loadOrderDetails={loadOrderDetails}
                  />

                  <Button
                    leftIcon={<RiDraftLine size={30} />}
                    w={"300px"}
                    children={"Ver todos itens"}
                    color={"theme.black"}
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
                  {wantDelete ? (
                    <>
                      <Button
                        leftIcon={<IoIosAlert size={30} />}
                        w={"300px"}
                        children={"Confirmar"}
                        color={"theme.white"}
                        bg={"theme.red"}
                        h={"50px"}
                        _hover={{
                          color: "black",
                          bg: "white",
                          border: "4px",
                          borderColor: "red",
                        }}
                        onClick={handleDelete as any}
                      />
                    </>
                  ) : (
                    <>
                      <Button
                        leftIcon={<MdDeleteSweep size={30} />}
                        w={"300px"}
                        children={"Excluir pedido"}
                        color={"theme.white"}
                        bg={"theme.red"}
                        h={"50px"}
                        _hover={{
                          color: "black",
                          bg: "white",
                          border: "1px",
                          borderColor: "black",
                        }}
                        onClick={handleWantDelete as any}
                      />
                    </>
                  )}
                </VStack>
              </>
            ) : !draft && !status ? (
              <VStack>
                <Button
                  fontSize={30}
                  fontWeight={"extrabold"}
                  w={"300px"}
                  children={"Finalizar"}
                  color={"theme.black"}
                  bg={"theme.yellow"}
                  h={"50px"}
                  _hover={{
                    color: "black",
                    bg: "white",
                    border: "1px",
                    borderColor: "black",
                  }}
                  onClick={handleSetToConcluids as any}
                />
                <Button
                  ml={"45px"}
                  mb={"15px"}
                  w={"300px"}
                  children={"Ver todos itens"}
                  color={"theme.black"}
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
              </VStack>
            ) : !draft && status ? (
              <>
                <Button
                  ml={"25px"}
                  mb={"15px"}
                  w={"300px"}
                  children={"Ver todos itens"}
                  color={"theme.black"}
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
            ) : (
              <></>
            )}

            <Box ml={[5]} mt={7}>
              {orderData.length > 0 ? (
                <>
                  {orderData &&
                    orderData.map((order: any) => (
                      <CardProductMobile
                        item_id={order.id}
                        category={order.product.category_id}
                        description={order.product.description}
                        image={order.product.image}
                        id={order.product.id}
                        price={order.product.price}
                        protein={order.product.protein}
                        size={order.product.hungryLevel}
                        title={order.product.name}
                        amount={order.amount}
                        loadOrderDetails={loadOrderDetails}
                        draft={draft}
                        orderData={orderData}
                        setTotal={setTotal}
                      />
                    ))}
                </>
              ) : (
                <></>
              )}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={Close as any}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
