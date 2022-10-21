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
import { CardTotalValue } from "../../components/CardTotalTableOrderValue";
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
import { Input } from "../../components/Input";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
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

interface TableDataProps {
  table: number;
}

const tableSchema = yup.object().shape({
  table: yup.number().required("Número da mesa é obrigatório"),
});

export const ListOrders = () => {
  const { order } = useContext(OrderContext);

  const [table, setTable] = useState(0);

  const [wanteCloseOrder, setWantCloseOrder] = useState(false);

  const [totalTable, setTotalTable] = useState(0);

  const [isLargerThan1281] = useMediaQuery("(min-width: 1281px)");

  const [orderData, setOrderData] = useState([]);

  const token = localStorage.getItem("@AcessToken");

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<TableDataProps>({
    resolver: yupResolver(tableSchema),
  });

  const loadAllOrdersByTable = async (data: TableDataProps) => {
    const { table } = data;
    setTable(table);
    api
      .post(`/orders/table`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setOrderData(response.data);
        setWantCloseOrder(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadOpenOrder = useCallback(async () => {
    try {
      const response = await api.get(`/orders/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrderData(response.data);
      setWantCloseOrder(false);
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
      setWantCloseOrder(false);
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
      setWantCloseOrder(false);
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
      setWantCloseOrder(false);
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
      setWantCloseOrder(false);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    loadOpenOrder();
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
            <VStack spacing={10}>
              <HStack spacing={1}>
                <HStack spacing={1}>
                  <Box w={"30px"} h={"30px"} bg={"theme.blue"} border={"1px"} />

                  <Text fontSize={[12]}>Pedidos rascunho</Text>
                </HStack>
                <HStack spacing={1}>
                  <Box
                    w={"30px"}
                    h={"30px"}
                    bg={"theme.orange"}
                    border={"1px"}
                  />

                  <Text fontSize={[12]}>Pedidos em produção</Text>
                </HStack>
                <HStack spacing={1}>
                  <Box w={"30px"} h={"30px"} bg={"#089605"} border={"1px"} />

                  <Text fontSize={[12]}>Pedidos concluidos</Text>
                </HStack>
              </HStack>

              <VStack>
                <Input
                  placeholder={"digite o número da mesa"}
                  {...register("table")}
                  error={errors.table}
                  label={"Consultar pedidos / Fechar mesa"}
                />
                <Button
                  color={"theme.white"}
                  bg={"theme.darkgreen"}
                  onClick={handleSubmit(loadAllOrdersByTable as any)}
                  w={["200px", "420px"]}
                  _hover={{
                    color: "black",
                    bg: "white",
                    border: "1px",
                    borderColor: "black",
                  }}
                >
                  Consultar
                </Button>
              </VStack>
              {wanteCloseOrder ? (
                <>
                  <Text fontWeight={"extrabold"} fontSize={20}>
                    Todos pedidos da mesa {table}
                  </Text>
                </>
              ) : (
                <></>
              )}
            </VStack>
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
                      loadOpenOrder={loadOpenOrder}
                      setTotalTable={setTotalTable}
                      totalTable={totalTable}
                    />
                  ))}
              </>
            ) : (
              <></>
            )}
            {wanteCloseOrder ? (
              <>
                {orderData.length === 0 ? (
                  <></>
                ) : (
                  <>
                    <CardTotalValue table={Number(table)}></CardTotalValue>
                  </>
                )}

                <Button
                  children={"Fechar mesa"}
                  bg={"theme.red"}
                  color={"theme.white"}
                  w={[200, 320]}
                />
              </>
            ) : (
              <></>
            )}
          </VStack>
        </>
      ) : (
        <>
          {/* mobile */}

          <VStack mt={50} spacing={5} justifyContent={"center"} mb={10} ml={5}>
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
              <HStack spacing={1}>
                <Box w={"30px"} h={"30px"} bg={"theme.blue"} border={"1px"} />

                <Text fontSize={[10]}>Pedidos rascunho</Text>
              </HStack>
              <HStack spacing={1}>
                <Box w={"30px"} h={"30px"} bg={"theme.orange"} border={"1px"} />

                <Text fontSize={[10]}>Pedidos em produção</Text>
              </HStack>
              <HStack spacing={1}>
                <Box w={"30px"} h={"30px"} bg={"#089605"} border={"1px"} />

                <Text fontSize={[10]}>Pedidos concluidos</Text>
              </HStack>
            </Center>
            <VStack justifyContent={"flex-start"}>
              <Input
                placeholder={"digite o número da mesa"}
                {...register("table")}
                error={errors.table}
                label={"Consultar pedidos / Fechar mesa"}
              />
              <Button
                color={"theme.white"}
                bg={"theme.darkgreen"}
                onClick={handleSubmit(loadAllOrdersByTable as any)}
                w={["200px", "420px"]}
                _hover={{
                  color: "black",
                  bg: "white",
                  border: "1px",
                  borderColor: "black",
                }}
              >
                Consultar
              </Button>
            </VStack>
            {wanteCloseOrder ? (
              <>
                <Text fontWeight={"extrabold"} fontSize={20}>
                  Todos pedidos da mesa {table}
                </Text>
              </>
            ) : (
              <></>
            )}
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
                      loadOpenOrder={loadOpenOrder}
                      setTotalTable={setTotalTable}
                      totalTable={totalTable}
                    />
                  ))}
              </>
            ) : (
              <></>
            )}
            {wanteCloseOrder ? (
              <>
                {orderData.length === 0 ? (
                  <></>
                ) : (
                  <>
                    <CardTotalValue table={Number(table)}></CardTotalValue>
                  </>
                )}
                <Button
                  children={"Fechar mesa"}
                  bg={"theme.red"}
                  color={"theme.white"}
                  w={[200, 320]}
                />
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
