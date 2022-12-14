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
import { RiAddLine } from "react-icons/ri";
import { ListProductsToAdd } from "../../components/ListProductsToAdd";

interface OrderProps {
  order_id: string;
  loadOrderDetails: () => void;
}

export const ModalAddItem = ({ order_id, loadOrderDetails }: OrderProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const token = localStorage.getItem("@AcessToken");
  const [newName, setNewName] = useState("");

  return (
    <>
      <Button
        fontWeight={"extrabold"}
        w={"300px"}
        leftIcon={<RiAddLine size={40} />}
        children={"Adicionar itens"}
        color={"theme.black"}
        bg={"theme.green"}
        h={"50px"}
        _hover={{
          color: "black",
          bg: "white",
          border: "1px",
          borderColor: "black",
        }}
        onClick={onOpen}
      />

      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        size={"sm"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar produtos </ModalHeader>

          <ModalCloseButton />
          <ModalBody>
            <ListProductsToAdd
              order_id={order_id}
              loadOrderDetails={loadOrderDetails}
            ></ListProductsToAdd>
          </ModalBody>
          <Box ml={[2, 10]}></Box>
          <ModalFooter>
            <HStack>
              <Button colorScheme="red" mr={3} onClick={onClose}>
                fechar
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
