import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  HStack,
  Text,
  ModalHeader,
  ModalFooter,
} from "@chakra-ui/react";
import React from "react";

import { FaExclamationCircle } from "react-icons/fa";

interface ModalFailProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalFail = ({ isOpen, onClose }: ModalFailProps) => {
  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="80%"
      backdropBlur="2px"
    />
  );

  const { onOpen } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayTwo />);

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <HStack w={"449px"} h={"70px"} bg={"#9d0606"}>
            <ModalHeader
              fontFamily={"heading"}
              color={"theme.white"}
              fontSize={30}
              fontWeight={"extrabold"}
            >
              Opss...
            </ModalHeader>
            <FaExclamationCircle color={"#f4f3f3"} size={30} />
          </HStack>

          <ModalCloseButton color={"theme.white"} />
          <ModalBody>
            <Text fontWeight={"semibold"}>Email ou senha incorretos.</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
