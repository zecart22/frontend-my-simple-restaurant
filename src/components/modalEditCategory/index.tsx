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
  Input,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

import { api } from "../../services";

interface EditCategoryProps {
  category_id: string;
  oldName: string;
  loadCategory: any;
}

interface EditCategory {
  name: string;
}

export const ModalEditCategory = ({
  category_id,
  oldName,
  loadCategory,
}: EditCategoryProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const token = localStorage.getItem("@AcessToken");
  const [newName, setNewName] = useState("");

  const handleNewName = (e: any) => {
    setNewName(e.target.value);
  };

  const handleEdit = async (data: EditCategory) => {
    data = { name: newName };
    console.log(data);
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
              placeholder="escolha um novo nome"
              value={newName}
              onChange={handleNewName}
            />
          </ModalBody>
          <Box ml={[2, 10]}></Box>
          <ModalFooter>
            <HStack>
              <Button colorScheme="orange" mr={3} onClick={handleEdit as any}>
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
