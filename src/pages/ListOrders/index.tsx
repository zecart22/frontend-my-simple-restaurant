import { VStack, Text, HStack } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { MdOutlineAddBox } from "react-icons/md";
import { CardOrdersList } from "../../components/Cards/CardOrders";
import { Link } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import { OrderContext } from "../../contexts/OrdersContext";
import { api } from "../../services";

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

  const [orderData, setCategoryData] = useState([]);

  const token = localStorage.getItem("@AcessToken");

  const loadCategory = useCallback(async () => {
    try {
      const response = await api.get(`/orders/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategoryData(response.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    loadCategory();
  }, []);

  return (
    <>
      <Header />
      <VStack mt={50} spacing={5} justifyContent={"center"}>
        <Text fontSize={30}>Lista de Pedidos</Text>

        {orderData.length > 0 ? (
          <>
            {orderData &&
              orderData.map((order: Order) => (
                <CardOrdersList table={order.table} />
              ))}
          </>
        ) : (
          <Text fontFamily={"Rock Salt, cursive"}>...carregando pedidos</Text>
        )}

        <HStack>
          <MdOutlineAddBox size={50} color={"theme.gray100"} />
          <Link to={"/openorder"}>
            <Text fontSize={20} color={"theme.red"}>
              Abrir novo pedido
            </Text>
          </Link>
        </HStack>
      </VStack>
    </>
  );
};
