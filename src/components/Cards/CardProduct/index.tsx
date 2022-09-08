import {
  Box,
  HStack,
  Text,
  VStack,
  Image,
  useToast,
  useMediaQuery,
  keyframes,
} from "@chakra-ui/react";

import { api } from "../../../services";
import { useState } from "react";
import { IoIosAlert } from "react-icons/io";
import { Link } from "react-router-dom";
interface CardProductsProps {
  id: string;
  title: string;
  description: string;
  price: string;
  size: string;
  protein: string;
  image: string;
  category: string;
  productByCategory: any;
  setProductByCategory: any;
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
  productByCategory,
  setProductByCategory,
}: CardProductsProps) => {
  const [isLargerThan850] = useMediaQuery("(min-width: 1281px)");

  const [wantDelete, setWantDelete] = useState(false);

  const handleWantDelete = () => {
    setWantDelete(true);
  };

  if (wantDelete) {
    setTimeout(() => {
      setWantDelete(false);
    }, 5000);
  }

  const AppearFromRight = keyframes`
  from {opacity: 0;}
  to {transform: translateX(0px)}
`;

  const token = localStorage.getItem("@AcessToken");
  const toast = useToast();
  const handleDelete = async () => {
    await api
      .delete("/product?product_id=" + id, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        const index = productByCategory.findIndex((e: any) => e.id === id);
        productByCategory.splice(index, 1);
        setProductByCategory([...productByCategory]);
        toast({
          position: "top",
          title: "Yes...!",
          description: "Produto deletado",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
      })
      .catch((err) => {
        toast({
          position: "top",
          title: "Opss algo deu errado!",
          description: err,
          status: "error",
          duration: 500,
          isClosable: true,
        });
        console.log(err);
      });
  };

  console.log(productByCategory);

  return (
    <>
      {isLargerThan850 ? (
        <>
          <Box
            animation={`${AppearFromRight} 2s`}
            mt={50}
            w={"1000px"}
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
                <HStack spacing={10} fontSize={20}>
                  <Link to={`/editproduct/${id}`} color={"theme.red"}>
                    Editar
                  </Link>

                  {!wantDelete ? (
                    <>
                      <Text
                        as="button"
                        color={"theme.red"}
                        onClick={handleWantDelete as any}
                      >
                        Deletar
                      </Text>
                    </>
                  ) : (
                    <HStack>
                      <IoIosAlert color={"#ec0909"} size={30} />
                      <Text
                        as="button"
                        color={"theme.red"}
                        onClick={handleDelete as any}
                        fontWeight={"extrabold"}
                      >
                        Clique para confirmar
                      </Text>
                    </HStack>
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
                  <HStack spacing={5} fontSize={20}>
                    <Link to={`/editproduct/${id}`} color={"theme.red"}>
                      Editar
                    </Link>

                    {!wantDelete ? (
                      <>
                        <Text
                          as="button"
                          color={"theme.red"}
                          onClick={handleWantDelete as any}
                        >
                          Deletar
                        </Text>
                      </>
                    ) : (
                      <HStack>
                        <IoIosAlert color={"#ec0909"} size={30} />
                        <Text
                          as="button"
                          color={"theme.red"}
                          onClick={handleDelete as any}
                          fontWeight={"extrabold"}
                        >
                          Clique para confirmar
                        </Text>
                      </HStack>
                    )}
                  </HStack>
                </VStack>
              </VStack>
            </HStack>
          </Box>
        </>
      )}
    </>
  );
};
