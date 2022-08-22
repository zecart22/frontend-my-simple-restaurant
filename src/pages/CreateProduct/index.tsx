import {
  VStack,
  Text,
  Input,
  Button,
  HStack,
  Box,
  FormControl,
  FormLabel,
  Select,
  Flex,
  color,
  useToast,
} from "@chakra-ui/react";
import { RiImageAddFill } from "react-icons/ri";
import { TextArea } from "../../components/Input";
import { Header } from "../../components/Header";
import { Link, useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { api } from "../../services";
import * as yup from "yup";
import { setLocale } from "yup";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Api } from "../../services";
import { AppUploadImg } from "./ImageUpload";

interface CreatCategoryData {
  name: string;
  id: string;
}
interface CreatProductData {
  name: string;
  description: string;
  category_id: string;
  hungryLevel: string;
  price: number;
  protein: string;
  file: string;
}

setLocale({
  mixed: {
    notType: "${path} is required",
  },
});

const createProductSchema = yup.object().shape({
  name: yup.string().required(" obrigatório"),
  description: yup.string().required(" obrigatório"),
  category_id: yup.string().required(" obrigatório"),
  hungryLevel: yup.string().required(" obrigatório"),
  price: yup.number().required(" obrigatório"),
  protein: yup.string().required(" obrigatório"),
  file: yup.mixed().test("required", "Please select a file", (value) => {
    return value && value.length;
  }),
});

export const CreateProduct = () => {
  const toast = useToast();
  const token = localStorage.getItem("@AcessToken");
  const history = useHistory();

  const [avatarUrl, setAvatarUrl] = useState("");
  const [imageAvatar, setImageAvatar] = useState(null);

  const [categoryData, setCategoryData] = useState([]);

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

  useEffect(() => {
    loadCategory();
  }, []);

  const {
    formState: { errors: string },
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(createProductSchema),
  });

  const handleCreate = async (data: CreatProductData) => {
    console.log(data.file);
    console.log(data.file[0]);
    await api
      .post("/product", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        toast({
          position: "top",
          title: "Yes...!",
          description: "Produto criado com sucesso",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        history.push("/listproducts");
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

      <VStack className={""} mt={50} spacing={6} justifyContent={"center"}>
        <HStack spacing={[70, 100]}>
          <Text fontSize={[20, 30]}>Novo produto</Text>
          <Link to={"/listproducts"}>
            <Text fontSize={[15, 20]} color={"theme.red"}>
              Ver todos produtos
            </Text>
          </Link>
        </HStack>
        <VStack>
          <Text fontSize={15} color={"theme.red"}>
            Adicionar uma imagem
          </Text>
          <RiImageAddFill size={70} />

          <Input
            w={"155px"}
            h={"35px"}
            placeholder={"digite o número da mesa"}
            border={"none"}
            boxShadow={"md"}
            type={"file"}
            {...register("file")}
            accept="image/png, image/jpeg"
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
        />

        <Input
          w={["270px", "380px", "400px", "600px"]}
          h={"50px"}
          placeholder={"preço do produto"}
          border={"1px"}
          borderColor={"theme.gray50"}
          boxShadow={"md"}
          {...register("price")}
        />

        <Select
          w={["270px", "380px", "400px", "600px"]}
          h={"50px"}
          placeholder={"Selecione uma categoria"}
          border={"1px"}
          borderColor={"theme.gray50"}
          boxShadow={"md"}
          {...register("category_id")}
        >
          {categoryData &&
            categoryData.map((category: CreatCategoryData) => (
              <option value={category.id}>{category.name}</option>
            ))}
        </Select>

        <Select
          w={["270px", "380px", "400px", "600px"]}
          h={"50px"}
          placeholder={"Selecione uma proteína"}
          border={"1px"}
          borderColor={"theme.gray50"}
          boxShadow={"md"}
          {...register("protein")}
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
        />

        <Button
          w={["270px", "380px", "400px", "600px"]}
          h={"50px"}
          color={"theme.white"}
          children={"Criar produto"}
          bg={"theme.red"}
          _hover={{ color: "black", bg: "white", border: "2px" }}
          type={"submit"}
          onClick={handleSubmit(handleCreate as any)}
        />
      </VStack>
    </>
  );
};
