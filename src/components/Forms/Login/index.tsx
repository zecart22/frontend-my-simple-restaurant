import {
  Flex,
  VStack,
  Text,
  FormLabel,
  FormControl,
  Button,
  FormHelperText,
  FormErrorMessage,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";

import { useAuth } from "../../../contexts/AuthContext";
import { Input } from "../../Input";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ModalFail } from "../../modalFailLogin";

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
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [firstClickEmail, setFirstClickEmail] = useState(false);
  const [firstClickPassWord, setFirstClickPassWord] = useState(false);
  const [error, setError] = useState(false);

  const handleInputChangeEmail = (e: any) => setInputEmail(e.target.value);

  const handleInputChangePassword = (e: any) =>
    setInputPassword(e.target.value);

  const handleFirstClickEmail = () => {
    setFirstClickEmail(true);
  };

  const handleFirstClickPassWord = () => {
    setFirstClickPassWord(true);
  };

  const isErrorEmail = inputEmail === "" && firstClickEmail;
  const isErrorPassword = inputPassword === "" && firstClickPassWord;
  const clicks = firstClickEmail && firstClickPassWord;
  const isInvalid = !isErrorEmail && !isErrorPassword && clicks;

  const { signIn } = useAuth();
  const toast = useToast();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<LoginDataProps>({
    resolver: yupResolver(loginSchema),
  });

  const handleLogin = (data: LoginDataProps) => {
    signIn(data)
      .then((response) => {
        console.log(response);
        toast({
          position: "top",
          title: "Yes...!",
          description: "login realizado com sucesso",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
        onOpen();
      });
  };

  console.log(error);

  return (
    <>
      <ModalFail isOpen={isOpen} onClose={onClose} />
      <Flex
        _hover={{
          transform: "translateY(-2px)",
        }}
        transition="border 0.2s, ease 0s, transform 0.2s"
        w={["230px", "450px"]}
        h={"550px"}
        border={"1px"}
        borderColor={"theme.grafit"}
        boxShadow={"dark-lg"}
        bg={"theme.white"}
        justifyContent={"center"}
        color={"theme.grafit"}
      >
        <VStack spacing={10}>
          <Text fontSize={30} mt={5}>
            Login
          </Text>

          <Input
            placeholder={"adicione seu email"}
            {...register("email")}
            label="Email"
            error={errors.email}
          />

          <Input
            placeholder={"coloque sua senha"}
            type="password"
            {...register("password")}
            label="Senha"
            error={errors.password}
          />

          <Button
            w={["200px", "320px"]}
            color={"theme.white"}
            bg={"theme.red"}
            fontWeight={"bold"}
            h={"50px"}
            border={"2px"}
            borderColor={"theme.grafit"}
            boxShadow={"md"}
            type={"submit"}
            _hover={{ color: "white", bg: "gray.200" }}
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
    </>
  );
};
