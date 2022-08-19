import { VStack, Text, HStack } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { MdOutlineAddBox } from "react-icons/md";
import { CardOrdersList } from "../../components/Cards/CardOrders";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { OrderContext } from "../../contexts/OrdersContext";

export const ListOrders = () => {
  const { order } = useContext(OrderContext);

  return (
    <>
      <Header />
      <VStack mt={50} spacing={5} justifyContent={"center"}>
        <Text fontSize={30}>Lista de Pedidos</Text>

        {order.length > 0 ? (
          <>{order && order.map((table) => <CardOrdersList table={25} />)}</>
        ) : (
          <VStack>
            <Text fontSize={"5xl"} fontFamily={"Rock Salt, cursive"}>
              Ops nada por aqui
            </Text>
            <Link to={"/createcategory"}>
              <Text fontSize={10}>Clique aqui para criar uma categoria</Text>
            </Link>
          </VStack>
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
