import {
  Flex,
  VStack,
  Text,
  FormLabel,
  FormControl,
  Button,
  FormHelperText,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";

import { useAuth } from "../../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Link } from "react-router-dom";

/* import { Input } from "../../Input"; */

interface LoginDataProps {
  email: string;
  password: string;
}

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email obrigatório")
    .email("Digite um email válido"),
  password: yup.string().required("Senha obrigatória"),
});

export const LoginForm = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const handleInputChangeEmail = (e: any) => setInputEmail(e.target.value);

  const handleInputChangePassword = (e: any) =>
    setInputPassword(e.target.value);

  const isErrorEmail = inputEmail === "";
  const isErrorPassword = inputPassword === "";

  const { signIn } = useAuth();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const handleLogin = (data: LoginDataProps) => {
    console.log(data);
    signIn(data)
      .then((response) => {
        console.log(response);
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
      w={["370px", "400px"]}
      h={"600px"}
      border={"1px"}
      borderColor={"theme.grafit"}
      boxShadow={"dark-lg"}
      bg={"theme.white"}
      justifyContent={"center"}
      color={"theme.grafit"}
    >
      <VStack spacing={10}>
        <Text fontSize={30} mt={10}>
          Login
        </Text>
        <FormControl isRequired isInvalid={isErrorEmail}>
          <FormLabel>Email:</FormLabel>
          <Input
            placeholder={"adicione seu email"}
            {...register("email")}
            value={inputEmail}
            onChange={handleInputChangeEmail}
          />
          {isErrorEmail ? (
            <FormHelperText>adicione seu email de cadastro</FormHelperText>
          ) : (
            <FormErrorMessage>email obrigatório</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isRequired isInvalid={isErrorPassword}>
          <FormLabel>Senha:</FormLabel>
          <Input
            placeholder={"coloque sua senha"}
            type="password"
            {...register("password")}
            value={inputPassword}
            onChange={handleInputChangePassword}
          />
          {isErrorPassword ? (
            <FormHelperText>coloque sua senha de cadastro </FormHelperText>
          ) : (
            <FormErrorMessage>senha obrigatória</FormErrorMessage>
          )}
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
          onClick={handleSubmit(handleLogin as any)}
        >
          Entrar
        </Button>

        <VStack>
          <Text>Novo por aqui ?</Text>
          <Link to={"/signup"}>
            <Text fontSize={15} color={"theme.red"}>
              Clique aqui para se cadastrar
            </Text>
          </Link>
        </VStack>
      </VStack>
    </Flex>
  );
};
