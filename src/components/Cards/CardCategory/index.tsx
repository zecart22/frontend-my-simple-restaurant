import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";

export const CardCategory = () => {
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
        borderColor: "#f0f00c",
      }}
      transition="border 0.2s, ease 0s, transform 0.2s"
    >
      <HStack>
        <Box w={"80px"} h={"150px"} bg={"theme.yellow"}></Box>
        <VStack spacing={5}>
          <Text fontSize={30}>Categorias</Text>
          <VStack spacing={2} w={"200px"} textAlign={"center"}>
            <Text color={"gray.300"}>Ver Categorias</Text>
            <Text color={"gray.300"}>Criar Categorias</Text>
          </VStack>
        </VStack>
      </HStack>
    </Flex>
  );
};
