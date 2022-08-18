import {
  Center,
  Flex,
  HStack,
  VStack,
  Image,
  Box,
  Link,
  Text,
  Button,
  useMediaQuery,
  keyframes,
} from "@chakra-ui/react";

import { FaUserCircle } from "react-icons/fa";
import { CgAddR } from "react-icons/cg";
/* import { useAuth } from "../../contexts/AuthContext"; */
import { useHistory, useLocation } from "react-router-dom";

import { BiLogOut } from "react-icons/bi";

export const Header = () => {
  /* const { signOut } = useAuth(); */

  const AppearFromRight = keyframes`
  from {opacity: 0;}
  to {transform: translateX(0px)}
  `;

  const history = useHistory();

  const handleNavigation = (path: any) => {
    return history.push(path);
  };

  const [isLargerThan1302] = useMediaQuery("(min-width: 1302px)");

  const location = useLocation();
  let isHome = true;

  if (location.pathname !== "/") {
    isHome = false;
  }

  return (
    <>
      <Flex
        h="120px"
        flexDirection="row"
        justifyContent="space-between"
        px="5"
        py="1"
        bg={"theme.grafit"}
        boxShadow="0px 1px 4px"
        position="relative"
        width="100%"
        zIndex="100"
      >
        {isLargerThan1302 ? (
          <>
            <Flex>
              <HStack animation={`${AppearFromRight} 3s`}>
                <Text
                  fontSize={40}
                  fontFamily={"Rock Salt, cursive"}
                  color={"theme.red"}
                >
                  TEXAS
                </Text>

                <Text fontSize={30} color={"theme.white"} fontWeight={"bold"}>
                  {"Burguers"}
                </Text>
              </HStack>
            </Flex>
            <Flex alignItems="flex-end" mb={"10px"}>
              <HStack spacing="8" mr={5}>
                <VStack spacing={2}>
                  <FaUserCircle size={45} />

                  <Text
                    textDecoration={"none"}
                    fontWeight={"extrabold"}
                    textAlign={"left"}
                    color={"gray"}
                  >
                    Olá {"usuário"}
                  </Text>
                </VStack>

                <VStack>
                  <BiLogOut size={50} />
                  <Button
                    variant={"ghost"}
                    color={"theme.red"}
                    /*  onClick={signOut} */
                  >
                    Log Out
                  </Button>
                </VStack>
              </HStack>
            </Flex>
          </>
        ) : (
          <>
            <Flex alignItems="flex-end">
              <HStack>
                <HStack animation={`${AppearFromRight} 3s`}>
                  <Text
                    fontSize={30}
                    fontFamily={"Rock Salt, cursive"}
                    color={"theme.red"}
                  >
                    TEXAS
                  </Text>

                  <Text fontSize={20} color={"theme.white"} fontWeight={"bold"}>
                    {"Burguers"}
                  </Text>
                </HStack>{" "}
                <VStack>
                  <BiLogOut size={45} />
                  <Button
                    variant={"ghost"}
                    color={"theme.red"}
                    /* onClick={signOut} */
                  >
                    Log Out
                  </Button>
                </VStack>
              </HStack>
            </Flex>
          </>
        )}
      </Flex>
    </>
  );
};
