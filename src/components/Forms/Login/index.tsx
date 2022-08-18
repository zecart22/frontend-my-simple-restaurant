import {
  Flex,
  VStack,
  Text,
  Link,
  FormLabel,
  FormControl,
  Button,
} from "@chakra-ui/react";

import { Input } from "../../Input";

export const LoginForm = () => {
  return (
    <Flex
      _hover={{
        transform: "translateY(-2px)",
      }}
      transition="border 0.2s, ease 0s, transform 0.2s"
      w={"400px"}
      h={"600px"}
      border={"1px"}
      borderColor={"theme.grafit"}
      boxShadow={"dark-lg"}
      bg={"theme.white"}
      alignItems={"center"}
      justifyContent={"center"}
      color={"theme.grafit"}
    >
      <VStack spacing={10}>
        <Text fontSize={30}>Login</Text>
        <FormControl>
          <FormLabel>Email:</FormLabel>
          <Input placeholder={"adicione seu email"} />
        </FormControl>
        <FormControl>
          <FormLabel>Senha:</FormLabel>
          <Input placeholder={"coloque sua senha"} type="password" />
        </FormControl>
        <Button
          w={"350px"}
          color={"theme.white"}
          bg={"theme.red"}
          fontWeight={"bold"}
          h={"50px"}
          border={"2px"}
          borderColor={"theme.grafit"}
          boxShadow={"md"}
          type={"submit"}
        >
          Entrar
        </Button>

        <VStack>
          <Text>Novo por aqui ?</Text>
          <Link>
            <Text fontSize={15} color={"theme.red"}>
              {" "}
              Clique aqui para se cadastrar
            </Text>
          </Link>
        </VStack>
      </VStack>
    </Flex>
  );
};
