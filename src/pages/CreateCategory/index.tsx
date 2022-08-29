import { VStack, Text, Input, Button, useToast } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { Link, useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { api } from "../../services";
import * as yup from "yup";

import { useState } from "react";
interface CreatCategoryData {
  name: string;
}

const createCategorySchema = yup.object().shape({
  name: yup.string().required(" obrigatório"),
});

export const CreateCategory = () => {
  const toast = useToast();
  const token = localStorage.getItem("@AcessToken");
  const history = useHistory();

  const {
    formState: { errors: string },
    register,
    handleSubmit,
  } = useForm({
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
        <Text fontSize={30}>Nova Categoria</Text>
        <Input
          w={["270px", "380px", "400px", "600px"]}
          h={"50px"}
          placeholder={"digite o nome da nova categoria"}
          border={"1px"}
          borderColor={"theme.gray50"}
          boxShadow={"md"}
          {...register("name")}
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
    </>
  );
};
