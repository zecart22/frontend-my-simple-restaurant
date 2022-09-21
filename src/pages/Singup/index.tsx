import {
  Flex,
  HStack,
  keyframes,
  useMediaQuery,
  VStack,
  Text,
} from "@chakra-ui/react";
import { SignupForm } from "../../components/Forms/Signup";

export const Signup = () => {
  const AppearFromRight = keyframes`
    from {opacity: 0;}
    to {transform: translateX(0px)}
    `;
  const [isLargerThan1050] = useMediaQuery("(min-width: 1023px)");

  return (
    <Flex
      padding={["10px 15px", "10 15px", "0px", "0px"]}
      alignItems="center"
      justifyContent="center"
      height={["125vh"]}
      bgGradient={[
        "linear(to-b, #262526 65%, #ECE7E7 35%)",
        "linear(to-b, #262526 65%, #ECE7E7 35%)",
        "linear(to-r, #262526 75%, #ECE7E7 25%)",
        "linear(to-r, #262526 65%, #ECE7E7 35%)",
      ]}
      color="white"
    >
      {isLargerThan1050 ? (
        <>
          <HStack spacing={120}>
            <VStack spacing={10} animation={`${AppearFromRight} 3s`}>
              <Text fontSize={[60, 100]} fontFamily={"Rock Salt, cursive"}>
                TEXAS
              </Text>
              <VStack
                bg={"theme.red"}
                h={["60px", "80px"]}
                w={["150px", "250px"]}
              >
                <Text fontSize={30} color={"theme.white"} fontWeight={"bold"}>
                  {"Burguers"}
                </Text>
              </VStack>
            </VStack>
            <SignupForm />
          </HStack>
        </>
      ) : (
        <>
          <VStack>
            <VStack animation={`${AppearFromRight} 3s`}>
              <Text fontSize={30} fontFamily={"Rock Salt, cursive"} mt={5}>
                TEXAS
              </Text>
              <VStack bg={"theme.red"} h={"30px"} w={"100px"}>
                <Text fontSize={20} color={"theme.white"} fontWeight={"bold"}>
                  {"Burguers"}
                </Text>
              </VStack>
            </VStack>
            <SignupForm />
          </VStack>
        </>
      )}
    </Flex>
  );
};
