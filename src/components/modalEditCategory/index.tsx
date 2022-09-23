import {
  Text,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Box,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../Input";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { api } from "../../services";

interface EditCategoryProps {
  category_id: string;
  oldName: string;
  loadCategory: any;
}

interface EditCategory {
  name: string;
}

const editCategorySchema = yup.object().shape({
  name: yup.string().required(" nome da categoria é obrigatório"),
});

export const ModalEditCategory = ({
  category_id,
  oldName,
  loadCategory,
}: EditCategoryProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const token = localStorage.getItem("@AcessToken");

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<EditCategory>({
    resolver: yupResolver(editCategorySchema),
  });

  const handleEdit = async (data: EditCategory) => {
    api
      .put(`/category?category_id=${category_id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);

        toast({
          position: "top",
          title: "Yes...!",
          description: "Categoria editada",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        loadCategory();
        onClose();
      })
      .catch((err) => {
        toast({
          position: "top",
          title: "Algo deu errado!! ",
          description: err,
          status: "warning",
          duration: 3000,
          isClosable: true,
        });

        console.log(err);
      });
  };

  return (
    <>
      <Button
        onClick={onOpen}
        fontSize={["10px", "15px", "18px", "20px"]}
        h={"50px"}
        bg={"theme.white"}
        _hover={{
          color: "black",
          bg: "yellow",
          border: "1px",
          borderColor: "gray",
        }}
      >
        Editar
      </Button>

      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        size={"3xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Categoria : {oldName} </ModalHeader>

          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder={"digite o nome da categoria"}
              {...register("name")}
              label={"Nome"}
              error={errors.name}
            />
          </ModalBody>
          <Box ml={[2, 10]}></Box>
          <ModalFooter>
            <HStack>
              <Button
                colorScheme="orange"
                mr={3}
                onClick={handleSubmit(handleEdit as any)}
              >
                Confirmar
              </Button>
              <Button colorScheme="red" mr={3} onClick={onClose}>
                Cancelar
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
