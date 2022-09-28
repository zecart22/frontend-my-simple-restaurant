import {
  VStack,
  Text,
  useToast,
  Button,
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

import { useState } from "react";
interface CreatCategoryData {
  name: string;
}

const createCategorySchema = yup.object().shape({
  name: yup.string().required(" nome da categoria é obrigatório"),
});

export const CreateCategory = () => {
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
  } = useForm<CreatCategoryData>({
    resolver: yupResolver(createCategorySchema),
  });

  const handleCreate = async (data: CreatCategoryData) => {
    console.log(data);
    await api
      .post("/category", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        toast({
          position: "top",
          title: "Yes...!",
          description: "Categoria criada com sucesso",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        history.push("/listcategory");
      })

      .catch((err) => {
        console.log(err);
        onModalFailOpen();
        setTimeout(onModalFailClose, 3000);
      });
  };

  return (
    <>
      <Header />
      <ModalError
        isOpen={isModalFailOpen}
        onClose={onModalFailClose}
        title={"Opss"}
        message={"Nome indisponível, escolha outro e tente novamente"}
      />
      <Center>
        <VStack mt={50} spacing={5} justifyContent={"center"}>
          <Text fontSize={30}>Nova Categoria</Text>

          <Input
            isRequired
            w={["270px", "380px", "400px", "600px"]}
            placeholder={"nome da categoria"}
            {...register("name")}
            label={"Nome"}
            error={errors.name}
          />

          <Button
            w={["270px", "380px", "400px", "600px"]}
            h={"50px"}
            color={"theme.grafit"}
            children={"Criar Categoria"}
            bg={"theme.yellow"}
            type={"submit"}
            onClick={handleSubmit(handleCreate as any)}
          />

          <Link to={"/listcategory"}>
            <Text fontSize={20} color={"theme.red"}>
              Ver todas categorias
            </Text>
          </Link>
        </VStack>
      </Center>
    </>
  );
};
