import {
  VStack,
  Text,
  HStack,
  Button,
  useMediaQuery,
  Box,
  Center,
} from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { MdOutlineAddBox } from "react-icons/md";
import { CardOrdersList } from "../../components/Cards/CardOrders";
import { Link } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import { OrderContext } from "../../contexts/OrdersContext";
import { api } from "../../services";
import { RiDraftLine } from "react-icons/ri";
import { GiCampCookingPot } from "react-icons/gi";
import { MdDeliveryDining } from "react-icons/md";
import { GiHistogram } from "react-icons/gi";

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

export const ListOrders = () => {
  const { order } = useContext(OrderContext);

  const [isLargerThan1281] = useMediaQuery("(min-width: 1281px)");

  const [orderData, setOrderData] = useState([]);

  const token = localStorage.getItem("@AcessToken");

  const loadOpenOrder = useCallback(async () => {
    try {
      const response = await api.get(`/orders/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrderData(response.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const loadDraftOrder = useCallback(async () => {
    try {
      const response = await api.get(`/orders/draft`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrderData(response.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const loadConcluidOrder = useCallback(async () => {
    try {
      const response = await api.get(`/orders/concluid`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrderData(response.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const loadAllOrder = useCallback(async () => {
    try {
      const response = await api.get(`/orders/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrderData(response.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const loadDeliveryOrder = useCallback(async () => {
    try {
      const response = await api.get(`/orders/delivery`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrderData(response.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  console.log(orderData);

  return (
    <>
      <Header />
      {isLargerThan1281 ? (
        <>
          <VStack mt={50} spacing={5} justifyContent={"center"}>
            <HStack>
              <Button
                children={"Todos pedidos"}
                color={"theme.white"}
                bg={"theme.blue"}
                h={"50px"}
                _hover={{
                  color: "black",
                  bg: "white",
                  border: "1px",
                  borderColor: "black",
                }}
                onClick={loadAllOrder as any}
              />
              <Button
                leftIcon={<RiDraftLine size={30} />}
                bg={"theme.blue"}
                h={"50px"}
                _hover={{
                  color: "black",
                  bg: "white",
                  border: "1px",
                  borderColor: "black",
                }}
                onClick={loadDraftOrder as any}
                children={"Pedidos em rascunho"}
              />

              <Button
                leftIcon={<GiCampCookingPot size={30} />}
                children={"Pedidos abertos"}
                bg={"theme.blue"}
                h={"50px"}
                _hover={{
                  color: "black",
                  bg: "white",
                  border: "1px",
                  borderColor: "black",
                }}
                onClick={loadOpenOrder as any}
              />
              <Button
                leftIcon={<MdDeliveryDining size={30} />}
                children={" Pedidos delivery"}
                bg={"theme.blue"}
                h={"50px"}
                _hover={{
                  color: "black",
                  bg: "white",
                  border: "1px",
                  borderColor: "black",
                }}
                onClick={loadDeliveryOrder}
              />
              <Button
                color={"theme.white"}
                leftIcon={<GiHistogram size={30} />}
                children={"Histórico de pedidos"}
                bg={"#089605"}
                h={"50px"}
                _hover={{
                  color: "black",
                  bg: "white",
                  border: "1px",
                  borderColor: "black",
                }}
                onClick={loadConcluidOrder}
              />
            </HStack>
            <HStack spacing={10}>
              <Text fontSize={30}>Lista de Pedidos</Text>

              <Link to={"/openorder"}>
                <HStack spacing={2}>
                  <MdOutlineAddBox size={50} color={"theme.gray100"} />
                  <Text fontSize={20} color={"theme.red"}>
                    Abrir novo pedido
                  </Text>
                </HStack>
              </Link>
            </HStack>
            <HStack>
              <HStack>
                <Box w={"30px"} h={"30px"} bg={"theme.blue"} border={"1px"} />

                <Text fontSize={[12, 15]}>Pedidos rascunho</Text>
              </HStack>
              <HStack>
                <Box w={"30px"} h={"30px"} bg={"theme.orange"} border={"1px"} />

                <Text fontSize={[12, 15]}>Pedidos em produção</Text>
              </HStack>
              <HStack>
                <Box w={"30px"} h={"30px"} bg={"#089605"} border={"1px"} />

                <Text fontSize={[12, 15]}>Pedidos em concluidos</Text>
              </HStack>
            </HStack>
            {orderData.length > 0 ? (
              <>
                {orderData &&
                  orderData.map((order: Order) => (
                    <CardOrdersList
                      table={order.table}
                      created_at={order.created_at}
                      updated_at={order.updated_at}
                      draft={order.draft}
                      id={order.id}
                      isDelivery={order.isDelivery}
                      name={order.name}
                      status={order.status}
                      loadDraftOrder={loadDraftOrder}
                    />
                  ))}
              </>
            ) : (
              <></>
            )}
          </VStack>
        </>
      ) : (
        <>
          {/* mobile */}

          <VStack mt={50} spacing={5} justifyContent={"center"}>
            <VStack>
              <Button
                w="230px"
                children={"Todos pedidos"}
                bg={"theme.blue"}
                h={"50px"}
                _hover={{
                  color: "black",
                  bg: "white",
                  border: "1px",
                  borderColor: "black",
                }}
                onClick={loadAllOrder as any}
              />
              <Button
                w="230px"
                leftIcon={<RiDraftLine size={30} />}
                bg={"theme.blue"}
                h={"50px"}
                _hover={{
                  color: "black",
                  bg: "white",
                  border: "1px",
                  borderColor: "black",
                }}
                onClick={loadDraftOrder as any}
                children={"Pedidos em rascunho"}
              />

              <Button
                w="230px"
                leftIcon={<GiCampCookingPot size={30} />}
                children={"Pedidos abertos"}
                bg={"theme.blue"}
                h={"50px"}
                _hover={{
                  color: "black",
                  bg: "white",
                  border: "1px",
                  borderColor: "black",
                }}
                onClick={loadOpenOrder as any}
              />
              <Button
                w="230px"
                leftIcon={<MdDeliveryDining size={30} />}
                children={" Pedidos delivery"}
                bg={"theme.blue"}
                h={"50px"}
                _hover={{
                  color: "black",
                  bg: "white",
                  border: "1px",
                  borderColor: "black",
                }}
                onClick={loadDeliveryOrder}
              />
              <Button
                w="230px"
                color={"theme.white"}
                leftIcon={<GiHistogram size={30} />}
                children={"Histórico de pedidos"}
                bg={"theme.red"}
                h={"50px"}
                _hover={{
                  color: "black",
                  bg: "white",
                  border: "1px",
                  borderColor: "black",
                }}
                onClick={loadConcluidOrder}
              />
            </VStack>
            <VStack spacing={10}>
              <Link to={"/openorder"}>
                <HStack spacing={2}>
                  <MdOutlineAddBox size={50} color={"theme.gray100"} />
                  <Text fontSize={15} color={"theme.red"}>
                    Abrir novo pedido
                  </Text>
                </HStack>
              </Link>
              <Text fontSize={20}>Lista de Pedidos</Text>
            </VStack>

            <Center>
              <HStack>
                <Box w={"30px"} h={"30px"} bg={"theme.blue"} border={"1px"} />

                <Text fontSize={[12, 15]}>Pedidos rascunho</Text>
              </HStack>
              <HStack>
                <Box w={"30px"} h={"30px"} bg={"theme.orange"} border={"1px"} />

                <Text fontSize={[12, 15]}>Pedidos em produção</Text>
              </HStack>
              <HStack>
                <Box w={"30px"} h={"30px"} bg={"#089605"} border={"1px"} />

                <Text fontSize={[12, 15]}>Pedidos em concluidos</Text>
              </HStack>
            </Center>

            {orderData.length > 0 ? (
              <>
                {orderData &&
                  orderData.map((order: Order) => (
                    <CardOrdersList
                      table={order.table}
                      created_at={order.created_at}
                      updated_at={order.updated_at}
                      draft={order.draft}
                      id={order.id}
                      isDelivery={order.isDelivery}
                      name={order.name}
                      status={order.status}
                      loadDraftOrder={loadDraftOrder}
                    />
                  ))}
              </>
            ) : (
              <></>
            )}
          </VStack>
        </>
      )}
    </>
  );
};
