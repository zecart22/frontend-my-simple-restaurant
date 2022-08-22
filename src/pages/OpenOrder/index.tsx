import {
  VStack,
  Text,
  Input,
  Button,
  useToast,
  Select,
} from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { Link, useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { api } from "../../services";
import * as yup from "yup";
import { CgYoutube } from "react-icons/cg";

interface CreatOrderData {
  table: number;
  name: string;
}

const createOrderSchema = yup.object().shape({
  name: yup.string().required(" obrigatório"),
  table: yup.number().required(" obrigatório"),
});

export const OpenOrder = () => {
  const toast = useToast();
  const token = localStorage.getItem("@AcessToken");
  const history = useHistory();

  const {
    formState: { errors: string },
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(createOrderSchema),
  });

  const handleCreate = async (data: CreatOrderData) => {
    console.log(data);
    await api
      .post("/order", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        toast({
          position: "top",
          title: "Yes...!",
          description: "Pedido criado com sucesso",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        history.push("/listorders");
      })

      .catch((err) => {
        console.log(err);
        toast({
          position: "top",
          title: "Opss algo deu errado!! ",
          description: err,
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      <Header />
      <VStack mt={50} spacing={5} justifyContent={"center"}>
        <Text fontSize={30}>Novo pedido</Text>
        <Input
          w={["270px", "380px", "400px", "600px"]}
          h={"50px"}
          placeholder={"digite o número da mesa"}
          border={"1px"}
          borderColor={"theme.gray50"}
          boxShadow={"md"}
          {...register("table")}
        />
        <Input
          w={["270px", "380px", "400px", "600px"]}
          h={"50px"}
          placeholder={"digite o nome do cliente"}
          border={"1px"}
          borderColor={"theme.gray50"}
          boxShadow={"md"}
          {...register("name")}
        />

        <Button
          w={["270px", "380px", "400px", "600px"]}
          h={"50px"}
          color={"theme.grafit"}
          children={"Abrir pedido"}
          bg={"theme.blue"}
          type={"submit"}
          onClick={handleSubmit(handleCreate as any)}
        />
        <Link to={"/listorders"}>
          <Text fontSize={20} color={"theme.red"}>
            Ver todos pedidos
          </Text>
        </Link>
      </VStack>
    </>
  );
};
