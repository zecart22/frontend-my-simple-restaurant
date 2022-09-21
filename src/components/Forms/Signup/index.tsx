import {
  Flex,
  VStack,
  Text,
  FormLabel,
  FormControl,
  Button,
  Select,
  Input,
  useToast,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { api } from "../../../services";

interface SignUpDataProps {
  name: string;
  email: string;
  password: string;
  type: string;
  adress: string;
}

const signupSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup
    .string()
    .required("Email obrigatório")
    .email("Digite um email válido"),
  password: yup.string().required("Senha obrigatória"),
  type: yup.string().required("Tipo de usuário obrigatório"),
  adress: yup.string().required("Endereço obrigatório"),
});

export const SignupForm = () => {
  const history = useHistory();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const toast = useToast();

  const handleSignup = (data: SignUpDataProps) => {
    console.log(data.email);
    api
      .post("/users", data)
      .then((response) => {
        console.log(response);
        toast({
          position: "top",
          title: "Yes...!",
          description: "Cadastro feito com sucesso",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Flex
      _hover={{
        transform: "translateY(-2px)",
      }}
      transition="border 0.2s, ease 0s, transform 0.2s"
      w={["230px", "450px"]}
      h={"700px"}
      border={"1px"}
      borderColor={"theme.grafit"}
      boxShadow={"dark-lg"}
      bg={"theme.white"}
      justifyContent={"center"}
      color={"theme.grafit"}
    >
      <VStack spacing={2}>
        <Text fontSize={30} mt={10}>
          Cadastro
        </Text>
        <FormControl>
          <FormLabel>Nome:</FormLabel>
          <Input
            w={["200px", "420px"]}
            placeholder={"nome completo"}
            {...register("name")}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email:</FormLabel>
          <Input
            w={["200px", "420px"]}
            placeholder={"adicione seu email"}
            {...register("email")}
            type={"email"}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Escolha seu perfil:</FormLabel>
          <Select
            w={["200px", "420px"]}
            placeholder="Escolha uma opção"
            h={"50px"}
            border={"2px"}
            borderColor={"theme.grafit"}
            boxShadow={"md"}
            {...register("type")}
          >
            <option value="administrador">administrador</option>
            <option value="colaborador">colaborador</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Endereço:</FormLabel>
          <Input
            w={["200px", "420px"]}
            placeholder={"ex: Av. Monteiro , n 52 - Santos/SP"}
            {...register("adress")}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Senha:</FormLabel>
          <Input
            w={["200px", "420px"]}
            placeholder={"escolha uma senha forte"}
            type="password"
            {...register("password")}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Confirme a senha:</FormLabel>
          <Input
            w={["200px", "420px"]}
            placeholder={"confirme a senha"}
            type="password"
          />
        </FormControl>
        <Button
          w={["200px", "350px"]}
          color={"theme.white"}
          bg={"theme.red"}
          fontWeight={"bold"}
          h={"50px"}
          border={"2px"}
          borderColor={"theme.grafit"}
          boxShadow={"md"}
          type={"submit"}
          onClick={handleSubmit(handleSignup as any)}
        >
          Cadastrar
        </Button>

        <VStack>
          <Text>Já tem cadastro ?</Text>
          <Link to={"/"}>
            <Text fontSize={15} color={"theme.red"}>
              Clique aqui para logar
            </Text>
          </Link>
        </VStack>
      </VStack>
    </Flex>
  );
};
