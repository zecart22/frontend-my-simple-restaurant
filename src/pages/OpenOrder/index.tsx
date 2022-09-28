import {
  VStack,
  Text,
  Button,
  useToast,
  Select,
  Center,
  useDisclosure,
} from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Link, useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { api } from "../../services";
import { ModalError } from "../../components/ModalError";

interface CreatOrderData {
  table: number;
  name: string;
}

const createOrderSchema = yup.object().shape({
  name: yup.string().required("nome obrigatório"),
  table: yup.number().required("mesa obrigatória"),
});

export const OpenOrder = () => {
  const toast = useToast();
  const token = localStorage.getItem("@AcessToken");
  const history = useHistory();

  const {
    isOpen: isModalFailOpen,
    onOpen: onModalFailOpen,
    onClose: onModalFailClose,
  } = useDisclosure();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<CreatOrderData>({
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
        /*     onModalFailOpen();
        setTimeout(onModalFailClose, 1500); */
      });
  };

  return (
    <>
      <ModalError
        isOpen={isModalFailOpen}
        onClose={onModalFailClose}
        title={"Ops..."}
        message={"Algo deu errado, tente novamente"}
      />
      <Header />
      <Center>
        <VStack mt={50} spacing={5} justifyContent={"center"}>
          <Text fontSize={30}>Novo pedido</Text>
          <Input
            w={["270px", "380px", "400px", "600px"]}
            placeholder={"digite o número da mesa"}
            error={errors.table}
            label={"Mesa"}
            {...register("table")}
          />
          <Input
            w={["270px", "380px", "400px", "600px"]}
            label={"Cliente"}
            placeholder={"digite o nome do cliente"}
            error={errors.name}
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
      </Center>
    </>
  );
};
