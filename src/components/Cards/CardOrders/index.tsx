import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ModalOrder } from "../../modal";
import { Link } from "react-router-dom";
import { GiRoundTable } from "react-icons/gi";
import { BsCheckCircle } from "react-icons/bs";
import { useState } from "react";

export const CardOrders = () => {
  return (
    <Flex
      w={["270px", "380px", "400px", "600px"]}
      h={"150px"}
      border={"1px"}
      borderColor={"theme.gray50"}
      bg={"theme.white"}
      boxShadow={"md"}
      _hover={{
        transform: "translateY(-2px)",
        border: "2px",
        borderColor: "#74F80C",
      }}
      transition="border 0.2s, ease 0s, transform 0.2s"
    >
      <HStack>
        <Box w={"80px"} h={"150px"} bg={"theme.green"}></Box>
        <VStack spacing={5}>
          <Text fontSize={30}>Produtos</Text>
          <VStack spacing={2} w={"200px"} textAlign={"center"}>
            <Link to={"/listproducts"}>
              <Text color={"gray.300"}>Ver produtos</Text>
            </Link>
            <Link to={"/createproduct"}>
              <Text color={"gray.300"}>Criar produtos</Text>
            </Link>
          </VStack>
        </VStack>
      </HStack>
    </Flex>
  );
};

interface CardOrderProps {
  table: number;
  id: string;
  status: boolean;
  draft: boolean;
  isDelivery: boolean;
  name: string;
  created_at: string;
  updated_at: string;
  setTotalTable: any;
  totalTable: number;

  loadDraftOrder: () => void;
  loadOpenOrder: () => void;
}

export const CardOrdersList = ({
  table,
  id,
  status,
  draft,
  isDelivery,
  name,
  created_at,
  updated_at,
  loadDraftOrder,
  loadOpenOrder,
  setTotalTable,
  totalTable,
}: CardOrderProps) => {
  return (
    <HStack>
      {draft ? (
        <>
          <Flex
            w={["190px", "300px", "330px"]}
            h={"50px"}
            border={"1px"}
            borderColor={"theme.gray50"}
            bg={"theme.white"}
            boxShadow={"md"}
            _hover={{
              transform: "translateY(-2px)",
              border: "2px",

              borderColor: "#0CBFF8",
            }}
            transition="border 0.2s, ease 0s, transform 0.2s"
          >
            <HStack>
              <Center w={"60px"} h={"50px"} bg={"theme.blue"}>
                <GiRoundTable size={40} />
              </Center>

              <Text fontSize={[15, 20]}>
                Mesa {table} - {name}
              </Text>
            </HStack>
          </Flex>
        </>
      ) : !draft && !status ? (
        <>
          <Flex
            w={["190px", "300px", "330px"]}
            h={"50px"}
            border={"1px"}
            borderColor={"theme.gray50"}
            bg={"theme.white"}
            boxShadow={"md"}
            _hover={{
              transform: "translateY(-2px)",
              border: "2px",

              borderColor: "#F69420",
            }}
            transition="border 0.2s, ease 0s, transform 0.2s"
          >
            <HStack>
              <Center w={"60px"} h={"50px"} bg={"theme.orange"}>
                <GiRoundTable size={40} />
              </Center>

              <Text fontSize={[15, 20]}>
                Mesa {table} - {name}
              </Text>
            </HStack>
          </Flex>
        </>
      ) : !draft && status ? (
        <>
          <Flex
            w={["190px", "300px", "330px"]}
            h={"50px"}
            border={"1px"}
            borderColor={"theme.gray50"}
            bg={"theme.white"}
            boxShadow={"md"}
            _hover={{
              transform: "translateY(-2px)",
              border: "2px",

              borderColor: "#089605",
            }}
            transition="border 0.2s, ease 0s, transform 0.2s"
          >
            <HStack>
              <Center
                w={"60px"}
                h={"50px"}
                bg={"#089605"}
                justifyContent={"center"}
              >
                <BsCheckCircle size={35} color={"white"} />
              </Center>

              <Text fontSize={[15, 20]}>
                Mesa {table} - {name}
              </Text>
            </HStack>
          </Flex>
        </>
      ) : (
        <></>
      )}

      <ModalOrder
        table={table}
        created_at={created_at}
        updated_at={updated_at}
        draft={draft}
        id={id}
        isDelivery={isDelivery}
        name={name}
        status={status}
        loadDraftOrder={loadDraftOrder}
        loadOpenOrder={loadOpenOrder}
        setTotalTable={setTotalTable}
        totalTable={totalTable}
      />
    </HStack>
  );
};
