import {
  Flex,
  VStack,
  Text,
  Link,
  FormLabel,
  FormControl,
  Button,
  Select,
} from "@chakra-ui/react";

import { Input } from "../../Input";

export const SignupForm = () => {
  return (
    <Flex
      _hover={{
        transform: "translateY(-2px)",
      }}
      transition="border 0.2s, ease 0s, transform 0.2s"
      w={["370px", "450px"]}
      h={"900px"}
      border={"1px"}
      borderColor={"theme.grafit"}
      boxShadow={"dark-lg"}
      bg={"theme.white"}
      justifyContent={"center"}
      color={"theme.grafit"}
    >
      <VStack spacing={5}>
        <Text fontSize={30} mt={10}>
          Cadastro
        </Text>
        <FormControl>
          <FormLabel>Nome:</FormLabel>
          <Input placeholder={"nome completo"} />
        </FormControl>
        <FormControl>
          <FormLabel>Email:</FormLabel>
          <Input placeholder={"adicione seu email"} />
        </FormControl>
        <FormControl>
          <FormLabel>Escolha seu perfil:</FormLabel>
          <Select
            placeholder="Escolha uma opção"
            w={["340px", "350px"]}
            h={"50px"}
            border={"2px"}
            borderColor={"theme.grafit"}
            boxShadow={"md"}
          >
            <option value="administrador">administrador</option>
            <option value="colaborador">colaborador</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Endereço:</FormLabel>
          <Input placeholder={"adicione seu email"} />
        </FormControl>
        <FormControl>
          <FormLabel>Senha:</FormLabel>
          <Input placeholder={"adicione seu email"} type="password" />
        </FormControl>
        <FormControl>
          <FormLabel>Confirme a senha:</FormLabel>
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
          Cadastrar
        </Button>

        <VStack>
          <Text>Já tem cadastro ?</Text>
          <Link>
            <Text fontSize={15} color={"theme.red"}>
              {" "}
              Clique aqui para logar
            </Text>
          </Link>
        </VStack>
      </VStack>
    </Flex>
  );
};
