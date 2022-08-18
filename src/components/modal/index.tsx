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
} from "@chakra-ui/react";

import { CardProduct } from "../../components/Cards/CardProduct";
import img from "../../assets/images/lanche.png";

interface Products {
  id: string;
  title: string;
  description: string;
  price: string;
  size: string;
  protein: string;
  image: string;
  category: string;
}

interface ListIntesProps {
  products: Products[];
}

export const ModalListItensInOrder = (/* { products }: ListIntesProps */) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        bg={"theme.white"}
        border={"1px"}
        borderColor={"theme.gray50"}
        color={"red"}
        fontWeight={"bold"}
      >
        detalhes
      </Button>

      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        size={"6xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detalhes do pedido</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text color={"theme.red"}>Lista de itens </Text>
          </ModalBody>
          <Box ml={[2, 10]}>
            <CardProduct
              category={"Sanduiche"}
              description={
                "Este vem desde 1957: pão com gergelim, hambúrguer de carne grelhada no fogo, queijo derretido, alface, tomate, cebola, picles, ketchup e a maionese Texas"
              }
              id={"233"}
              image={img}
              price={"29,00"}
              protein={"carne"}
              size={"grande"}
              title={"Super X-Salada"}
            />
          </Box>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Fechar mesa
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
