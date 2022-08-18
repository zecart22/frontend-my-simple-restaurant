import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { ModalListItensInOrder } from "../../modal";

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
            <Text color={"gray.300"}>Ver produtos</Text>
            <Text color={"gray.300"}>Criar produtos</Text>
          </VStack>
        </VStack>
      </HStack>
    </Flex>
  );
};

interface CardOrderProps {
  table: number;
}

export const CardOrdersList = ({ table }: CardOrderProps) => {
  return (
    <Flex
      w={["270px", "380px", "400px", "600px"]}
      h={"50px"}
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
        <Box w={"20px"} h={"50px"} bg={"theme.green"}></Box>
        <HStack spacing={[10, 80]}>
          <Text fontSize={[15, 20]}>Mesa {table}</Text>
          <ModalListItensInOrder />
        </HStack>
      </HStack>
    </Flex>
  );
};
