import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Text,
  HStack,
  Center,
} from "@chakra-ui/react";
import { FiAlertTriangle } from "react-icons/fi";

interface ModalErrorProps {
  isOpen: boolean;
  message: string;
  title: string;
  onClose: () => void;
}

export const ModalError = ({
  isOpen,
  message,
  title,
  onClose,
}: ModalErrorProps) => {
  const { onOpen } = useDisclosure();

  return (
    <>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <HStack w={"449px"} h={"70px"} bg={"#9d0606"}>
            <Center>
              <FiAlertTriangle size={30} color={"white"} />

              <ModalHeader
                fontFamily={"heading"}
                color={"theme.white"}
                fontWeight={"extrabold"}
                w={"440px"}
                fontSize={20}
              >
                {title}
              </ModalHeader>
            </Center>
          </HStack>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              {message}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="orange" mr={3} onClick={onClose}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
