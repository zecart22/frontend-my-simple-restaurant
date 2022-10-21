import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../services";

interface OrderData {
  table: number;
}

export const CardTotalValue = ({ table }: OrderData) => {
  const token = localStorage.getItem("@AcessToken");

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

  useEffect(() => {
    loadTotalOrdersTable();
  }, []);

  return (
    <>
      <HStack>
        <Text>Valor total</Text>
        <Text>R$ {total},00</Text>
      </HStack>
    </>
  );
};
