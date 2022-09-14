import {
  VStack,
  Text,
  Input,
  Button,
  HStack,
  Image,
  Box,
  FormControl,
  FormLabel,
  Select,
  Flex,
  color,
  useToast,
} from "@chakra-ui/react";

import { useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { api } from "../../../services";
import * as yup from "yup";
import { setLocale } from "yup";
import { useCallback, useEffect, useState } from "react";

interface CreatCategoryData {
  name: string;
  id: string;
}
interface EditProductData {
  name: string;
  description: string;
  category_id: string;
  hungryLevel: string;
  price: string;
  protein: string;
  file: string;
  id: string;
}

setLocale({
  mixed: {
    notType: "${path} is required",
  },
});

const editProductSchema = yup.object().shape({
  name: yup.string().required(" obrigatório"),
  description: yup.string().required(" obrigatório"),
  category_id: yup.string().required(" obrigatório"),
  hungryLevel: yup.string().required(" obrigatório"),
  price: yup.string().required(" obrigatório"),
  protein: yup.string().required(" obrigatório"),
  image: yup.string().required("obrigatório"),
});

export const EditProductForm = ({
  name,
  category_id,
  description,
  file,
  hungryLevel,
  price,
  protein,
  id,
}: EditProductData) => {
  const toast = useToast();
  const token = localStorage.getItem("@AcessToken");
  const history = useHistory();

  const handleNavigation = (path: any) => {
    return history.push(path);
  };

  const [imageURL, setImageURL] = useState(file);

  const [categoryData, setCategoryData] = useState([]);

  const [error, setError] = useState(false);

  const handleInputChangeImage = (e: any) => setImageURL(e.target.value);

  const loadCategory = useCallback(async () => {
    try {
      const response = await api.get(`/categories_list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategoryData(response.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const {
    formState: { errors: string },
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(editProductSchema),
  });

  const handleEdit = async (data: EditProductData) => {
    console.log(data);
    api
      .put(`/product?product_id=${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);

        toast({
          position: "top",
          title: "Tudo certo",
          description: "Produto editado",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        handleNavigation("/listproducts");
      })
      .catch((err) => {
        console.log(err);
      })
      .then((response) => {
        setError(true);
      });
    if (error) {
      toast({
        position: "top",
        title: "Não foi possivel editar produto!! ",
        description: "Nome já em uso",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    loadCategory();
  }, []);

  console.log(id);

  return (
    <>
      <VStack>
        <>
          <Image
            src={imageURL}
            alt="Foto do produto"
            width={[250, 350]}
            height={[250, 350]}
          />
        </>

        <Input
          w={["270px", "380px", "400px", "600px"]}
          h={"50px"}
          placeholder={"coloque aqui a url da imagem escolhida"}
          border={"none"}
          boxShadow={"md"}
          type={"text"}
          {...register("image")}
          onChange={handleInputChangeImage}
          defaultValue={file}
        />
      </VStack>

      <Input
        w={["270px", "380px", "400px", "600px"]}
        h={"50px"}
        placeholder={"nome do produto"}
        border={"1px"}
        borderColor={"theme.gray50"}
        boxShadow={"md"}
        {...register("name")}
        defaultValue={name}
      />

      <Input
        w={["270px", "380px", "400px", "600px"]}
        h={"50px"}
        placeholder={"preço do produto"}
        border={"1px"}
        borderColor={"theme.gray50"}
        boxShadow={"md"}
        {...register("price")}
        defaultValue={price}
      />
      <FormLabel fontSize={12}>
        Caso queria trocar de categoria, selecione uma nova.
      </FormLabel>
      <Select
        isRequired={false}
        w={["270px", "380px", "400px", "600px"]}
        h={"50px"}
        placeholder={"Selecione uma categoria"}
        border={"1px"}
        borderColor={"theme.gray50"}
        boxShadow={"md"}
        {...register("category_id")}
        defaultValue={category_id}
      >
        {categoryData.length > 0 ? (
          <>
            {categoryData &&
              categoryData.map((category: CreatCategoryData) => (
                <option value={category.id}>{category.name}</option>
              ))}
          </>
        ) : (
          <></>
        )}
      </Select>

      <Select
        w={["270px", "380px", "400px", "600px"]}
        h={"50px"}
        placeholder={"Selecione uma proteína"}
        border={"1px"}
        borderColor={"theme.gray50"}
        boxShadow={"md"}
        {...register("protein")}
        defaultValue={protein}
      >
        <option value={"carne"}>{"carne"}</option>
        <option value={"frango"}>{"frango"}</option>
        <option value={"nenhuma"}>{"nenhuma"}</option>
      </Select>

      <Select
        w={["270px", "380px", "400px", "600px"]}
        h={"50px"}
        placeholder={"Selecione o tamanho"}
        border={"1px"}
        borderColor={"theme.gray50"}
        boxShadow={"md"}
        {...register("hungryLevel")}
        defaultValue={hungryLevel}
      >
        <option value={"grande"}>{"grande"}</option>
        <option value={"medio"}>{"medio"}</option>
        <option value={"pequeno"}>{"pequeno"}</option>
      </Select>

      <Input
        w={["270px", "380px", "400px", "600px"]}
        h={"80px"}
        placeholder={"descrição do produto"}
        border={"1px"}
        borderColor={"theme.gray50"}
        boxShadow={"md"}
        {...register("description")}
        defaultValue={description}
      />

      <Button
        w={["270px", "380px", "400px", "600px"]}
        h={"50px"}
        color={"theme.white"}
        children={"Editar produto"}
        bg={"theme.red"}
        _hover={{ color: "black", bg: "white", border: "2px" }}
        type={"submit"}
        onClick={handleSubmit(handleEdit as any)}
      />
    </>
  );
};
