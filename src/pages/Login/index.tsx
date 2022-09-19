import {
  Box,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
  Image,
  useMediaQuery,
  keyframes,
} from "@chakra-ui/react";

import { LoginForm } from "../../components/Forms/Login";

export const Login = () => {
  const AppearFromRight = keyframes`
  from {opacity: 0;}
  to {transform: translateX(0px)}
  `;
  const [isLargerThan1023] = useMediaQuery("(min-width: 1023px)");

  return (
    <Flex
      padding={["10px 15px", "10 15px", "0px", "0px"]}
      alignItems="center"
      justifyContent="center"
      height={["100vh"]}
      bgGradient={[
        "linear(to-b, #262526 65%, #ECE7E7 35%)",
        "linear(to-b, #262526 65%, #ECE7E7 35%)",
        "linear(to-r, #262526 75%, #ECE7E7 25%)",
        "linear(to-r, #262526 65%, #ECE7E7 35%)",
      ]}
      color="white"
    >
      {isLargerThan1023 ? (
        <>
          <HStack spacing={[150]}>
            <VStack spacing={10} animation={`${AppearFromRight} 3s`}>
              <Text fontSize={[60, 100]} fontFamily={"Rock Salt, cursive"}>
                TEXAS
              </Text>
              <VStack bg={"theme.red"} h={"80px"} w={"250px"}>
                <Text
                  fontSize={[40, 50]}
                  color={"theme.white"}
                  fontWeight={"bold"}
                >
                  {"Burguers"}
                </Text>
              </VStack>
            </VStack>
            <LoginForm />
          </HStack>
        </>
      ) : (
        <>
          <VStack spacing={5} mt={5}>
            <VStack animation={`${AppearFromRight} 3s`}>
              <Text fontSize={[35]} fontFamily={"Rock Salt, cursive"}>
                TEXAS
              </Text>
              <VStack bg={"theme.red"} h={"30px"} w={"150px"}>
                <Text fontSize={20} color={"theme.white"} fontWeight={"bold"}>
                  {"Burguers"}
                </Text>
              </VStack>
            </VStack>
            <LoginForm />
          </VStack>
        </>
      )}
    </Flex>
  );
};
