import { Box, Button, HStack, Text, VStack, useToast } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../services";

interface OrderData {
  table: number;
  loadOpenOrder: () => void;
}

interface TableNumber {
  tableNumber: number;
}

export const CardTotalValue = ({ table, loadOpenOrder }: OrderData) => {
  const token = localStorage.getItem("@AcessToken");
  const toast = useToast();

  const [total, setTotal] = useState(0);

  const loadTotalOrdersTable = async () => {
    api
      .get(`/table/total/price?table=${table}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        setTotal(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeTable = async (data: TableNumber) => {
    data = { tableNumber: table };
    api
      .put(`/close/table`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        toast({
          position: "top",
          title: "Yes...!",
          description: "Mesa fechada com sucesso",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        loadOpenOrder();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadTotalOrdersTable();
  }, []);

  return (
    <VStack>
      <HStack>
        <Text>Valor total</Text>
        <Text>R$ {total},00</Text>
      </HStack>
      <Button
        children={"Fechar mesa"}
        bg={"theme.red"}
        color={"theme.white"}
        w={[200, 320]}
        onClick={closeTable as any}
      />
    </VStack>
  );
};
