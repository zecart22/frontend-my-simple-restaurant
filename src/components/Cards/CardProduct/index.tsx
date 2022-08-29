import {
  Box,
  Flex,
  HStack,
  Text,
  VStack,
  Image,
  theme,
  Center,
  useMediaQuery,
  keyframes,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const CardProductSection = () => {
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
        borderColor: "#0CBFF8",
      }}
      transition="border 0.2s, ease 0s, transform 0.2s"
    >
      <HStack>
        <Box w={"80px"} h={"150px"} bg={"theme.blue"}></Box>
        <VStack spacing={5}>
          <Text fontSize={30}>Pedidos</Text>
          <VStack spacing={2} w={"200px"} textAlign={"center"}>
            <Link to={"/listorders"}>
              <Text color={"gray.300"}>Ver Pedidos</Text>
            </Link>
            <Link to={"/openorder"}>
              <Text color={"gray.300"}>Criar novo Pedido</Text>
            </Link>
          </VStack>
        </VStack>
      </HStack>
    </Flex>
  );
};

interface CardProductsProps {
  id: string;
  title: string;
  description: string;
  price: string;
  size: string;
  protein: string;
  image: string;
  category: string;
}

export const CardProduct = ({
  title,
  description,
  id,
  image,
  price,
  protein,
  size,
  category,
}: CardProductsProps) => {
  const [isLargerThan850] = useMediaQuery("(min-width: 850px)");
  const AppearFromRight = keyframes`
  from {opacity: 0;}
  to {transform: translateX(0px)}
`;

  console.log(image);

  return (
    <>
      {isLargerThan850 ? (
        <>
          <Box
            animation={`${AppearFromRight} 2s`}
            mt={50}
            w={"800px"}
            h={"300px"}
            border={"1px"}
            borderColor={["theme.grafit", "theme.gray50"]}
            bg={"theme.white"}
            boxShadow={"md"}
            _hover={{
              transform: "translateY(-2px)",
              border: "2px",
              borderColor: "#5B0101",
            }}
            transition="border 0.2s, ease 0s, transform 0.2s"
            borderRadius={20}
          >
            <HStack>
              <Box
                w={"40px"}
                h="250px"
                bg={"theme.wine"}
                borderRadius={20}
                mt={2}
                ml={5}
              ></Box>
              <VStack>
                <Text fontSize={20} fontWeight={"semibold"} w={"350px"}>
                  {title}
                </Text>
                <Text fontFamily={"Rock Salt, cursive"} color={"theme.red"}>
                  Preço : {price}
                </Text>
                <Image
                  maxWidth={"100%"}
                  w={"220px"}
                  h={"220px"}
                  objectFit={"contain"}
                  src={image}
                />
              </VStack>
              <VStack spacing={10}>
                <Text mb={5}>{description}</Text>
                <HStack
                  color={"theme.white"}
                  fontWeight={"extrabold"}
                  flexWrap={"wrap"}
                  justifyContent={"center"}
                >
                  <Box
                    mt={[5, 5, 5, 0]}
                    mb={[5, 5, 5, 0]}
                    boxShadow={"md"}
                    h={"25px"}
                    w={"130px"}
                    bg={"#ffa909"}
                    borderRadius={[40, 10, 40, 10]}
                    textAlign={"center"}
                  >
                    {category.toLocaleUpperCase()}
                  </Box>
                  <Box
                    mt={[5, 5, 5, 0]}
                    mb={[5, 5, 5, 0]}
                    boxShadow={"md"}
                    h={"25px"}
                    w={"130px"}
                    bg={"theme.orange"}
                    borderRadius={[40, 10, 40, 10]}
                    textAlign={"center"}
                  >
                    {size.toLocaleUpperCase()}
                  </Box>
                  {protein === "nenhuma" ? (
                    <></>
                  ) : (
                    <>
                      <Box
                        mt={[5, 5, 5, 0]}
                        mb={[5, 5, 5, 0]}
                        boxShadow={"md"}
                        h={"25px"}
                        w={"130px"}
                        bg={"theme.red"}
                        borderRadius={[40, 10, 40, 10]}
                        textAlign={"center"}
                      >
                        {protein.toLocaleUpperCase()}
                      </Box>
                    </>
                  )}
                </HStack>
              </VStack>
            </HStack>
          </Box>
        </>
      ) : (
        <>
          <Box
            mb={10}
            w={"350px"}
            h={"570px"}
            border={"1px"}
            borderColor={"theme.gray100"}
            borderLeft={"5px"}
            borderLeftColor={"theme.white"}
            bg={"theme.white"}
            boxShadow={"lg"}
            _hover={{
              transform: "translateY(-2px)",
              border: "2px",
              borderColor: "#5B0101",
            }}
            transition="border 0.2s, ease 0s, transform 0.2s"
            borderRadius={20}
          >
            <HStack>
              <Box
                w={"5px"}
                h="520px"
                bg={"theme.wine"}
                borderRadius={20}
                mt={4}
                ml={1}
              ></Box>
              <VStack>
                <VStack>
                  <Text fontSize={20} fontWeight={"semibold"} mt={3}>
                    {title}
                  </Text>
                  <Text fontFamily={"Rock Salt, cursive"} color={"theme.red"}>
                    Preço : {price}
                  </Text>
                  <Image src={image} />
                </VStack>
                <VStack spacing={10}>
                  <Text mb={5} w={"300px"} textAlign={"justify"}>
                    {description}
                  </Text>
                  <VStack
                    color={"theme.white"}
                    fontWeight={"extrabold"}
                    flexWrap={"wrap"}
                    justifyContent={"center"}
                  >
                    <Box
                      boxShadow={"md"}
                      h={"25px"}
                      w={"320px"}
                      bg={"#ffa909"}
                      borderRadius={[40, 10, 40, 10]}
                      textAlign={"center"}
                    >
                      Categoria: {category.toLocaleUpperCase()}
                    </Box>
                    <Box
                      boxShadow={"md"}
                      h={"25px"}
                      w={"320px"}
                      bg={"theme.orange"}
                      borderRadius={[40, 10, 40, 10]}
                      textAlign={"center"}
                    >
                      Tamanho: {size.toLocaleUpperCase()}
                    </Box>
                    <Box
                      boxShadow={"md"}
                      h={"25px"}
                      w={"320px"}
                      bg={"theme.red"}
                      borderRadius={[40, 10, 40, 10]}
                      textAlign={"center"}
                    >
                      Proteína: {protein.toLocaleUpperCase()}
                    </Box>
                  </VStack>
                </VStack>
              </VStack>
            </HStack>
          </Box>
        </>
      )}
    </>
  );
};
