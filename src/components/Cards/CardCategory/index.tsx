import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ModalEditCategory } from "../../modalEditCategory";
import { api } from "../../../services";
import { useState } from "react";
import { IoIosAlert } from "react-icons/io";

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
            <Link to={"/listcategory"}>
              <Text color={"gray.300"}>Ver Categorias</Text>
            </Link>
            <Link to={"/createcategory"}>
              <Text color={"gray.300"}>Criar Categorias</Text>
            </Link>
          </VStack>
        </VStack>
      </HStack>
    </Flex>
  );
};

interface CardCategoryProps {
  title: string;
  category_id: string;
  loadCategory: any;
  categoryData: any;
  setCategoryData: any;
}

export const CardCategoryName = ({
  title,
  category_id,
  loadCategory,
  categoryData,
  setCategoryData,
}: CardCategoryProps) => {
  const [wantDelete, setWantDelete] = useState(false);
  const [error, setError] = useState(false);

  const handleWantDelete = () => {
    setWantDelete(true);
  };

  if (wantDelete) {
    setTimeout(() => {
      setWantDelete(false);
    }, 3000);
  }

  const token = localStorage.getItem("@AcessToken");
  const toast = useToast();

  const handleDelete = async () => {
    await api
      .delete("/category?category_id=" + category_id, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        const index = categoryData.findIndex((e: any) => e.id === category_id);
        categoryData.splice(index, 1);
        setCategoryData([...categoryData]);
        setWantDelete(false);
        toast({
          position: "bottom",
          title: "Yes...!",
          description: "Categoria deletada",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .then((response) => {
        setError(true);
      });
    if (error) {
      toast({
        position: "top",
        title: "Não é possível deletar categoria!",
        description: "Essa categoria não está vazia",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <HStack>
      <Flex
        w={["150px", "200px", "300px", "600px"]}
        h={"50px"}
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
        <HStack spacing={[5, 10]}>
          <Box w={"20px"} h={"50px"} bg={"theme.yellow"}></Box>

          <Text fontSize={["15px", "18px", "20px"]}>{title}</Text>
        </HStack>
      </Flex>
      <HStack color={"theme.red"} spacing={2}>
        <ModalEditCategory
          category_id={category_id}
          oldName={title}
          loadCategory={loadCategory}
        />
        {!wantDelete ? (
          <>
            <Button
              fontSize={["10px", "15px", "18px", "20px"]}
              h={"50px"}
              bg={"theme.white"}
              _hover={{
                color: "white",
                bg: "red",
                border: "1px",
                borderColor: "gray",
              }}
              onClick={handleWantDelete as any}
            >
              Deletar
            </Button>
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
    </HStack>
  );
};
