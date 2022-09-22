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
  FormErrorMessage,
  FormHelperText,
  Select,
  Flex,
  color,
  useToast,
  Textarea,
  Center,
} from "@chakra-ui/react";
import { RiImageAddFill } from "react-icons/ri";

import { Header } from "../../components/Header";
import { Link, useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { api, apiImageUpload } from "../../services";
import * as yup from "yup";
import { setLocale } from "yup";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useState,
  FormEvent,
} from "react";

interface CreatCategoryData {
  name: string;
  id: string;
}
interface CreatProductData {
  name: string;
  description: string;
  category_id: string;
  hungryLevel: string;
  price: string;
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
  price: yup.string().required(" obrigatório"),
  protein: yup.string().required(" obrigatório"),
  image: yup.string().required("obrigatório"),
});

export const CreateProduct = () => {
  const toast = useToast();
  const token = localStorage.getItem("@AcessToken");
  const history = useHistory();

  const [error, setError] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [protein, setProtein] = useState("");
  const [size, setSize] = useState("");
  const [description, setDescription] = useState("");
  const [categoryData, setCategoryData] = useState([]);

  const invalidName = name === "";
  const invalidImageUrl = imageURL === "";
  const invalidPrice = price === "";
  const invalidCategory = category === "";
  const invalidProtein = protein === "";
  const invalidSize = size === "";
  const invalidDescription = description === "";

  const arrayForm = [
    invalidName,
    invalidImageUrl,
    invalidCategory,
    invalidDescription,
    invalidProtein,
    invalidSize,
    invalidPrice,
  ];

  const isInvalid = arrayForm.some((item) => item === true);

  const handleName = (e: any) => {
    setName(e.target.value);
  };

  const handlePrice = (e: any) => {
    setPrice(e.target.value);
  };

  const handleCategory = (e: any) => {
    setCategory(e.target.value);
  };

  const handleProtein = (e: any) => {
    setProtein(e.target.value);
  };

  const handleSize = (e: any) => {
    setSize(e.target.value);
  };

  const handleDescription = (e: any) => {
    setDescription(e.target.value);
  };

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
    await api
      .post("/product_url", data, {
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
      })
      .then((response) => {
        setError(true);
      });
    if (error) {
      toast({
        position: "bottom",
        title: "Não foi possivel criar produto ",
        description: "Nome do produto indisponível",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleShowError = () => {
    toast({
      position: "bottom",
      title: "Atenção",
      description: "Preencha todos os campos corretamente",
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <>
      <Header />
      <Center mb={10} color={"gray"}>
        <VStack mt={30} spacing={5} justifyContent={"center"}>
          <HStack spacing={[70, 100]}>
            <Text fontSize={[20, 30]}>Novo produto</Text>
            <Link to={"/listproducts"}>
              <Text fontSize={[15, 20]} color={"theme.red"}>
                Ver todos produtos
              </Text>
            </Link>
          </HStack>

          <VStack>
            {imageURL.length === 0 ? (
              <>
                <VStack>
                  <Text fontSize={15} color={"theme.red"}>
                    Adicionar uma imagem
                  </Text>
                  <RiImageAddFill size={70} />
                </VStack>
              </>
            ) : (
              <>
                <Image
                  src={imageURL}
                  alt="Foto do produto"
                  width={[250, 350]}
                  height={[250, 350]}
                />
              </>
            )}
            <FormControl isRequired isInvalid={invalidImageUrl}>
              <FormLabel fontSize={10}>Imagem URL</FormLabel>
              <Input
                w={["270px", "380px", "400px", "600px"]}
                h={"50px"}
                placeholder={"coloque aqui a url da imagem escolhida"}
                _placeholder={{ color: "gray" }}
                border={"none"}
                boxShadow={"md"}
                type={"text"}
                {...register("image")}
                value={imageURL}
                onChange={handleInputChangeImage}
              />
            </FormControl>
          </VStack>
          <FormControl isRequired isInvalid={invalidName}>
            <FormLabel fontSize={10}>Nome do produto</FormLabel>
            <Input
              w={["270px", "380px", "400px", "600px"]}
              h={"50px"}
              placeholder={"adicione um nome para o produto"}
              _placeholder={{ color: "gray" }}
              border={"1px"}
              borderColor={"theme.gray50"}
              boxShadow={"md"}
              {...register("name")}
              value={name}
              onChange={handleName as any}
            />
          </FormControl>

          <FormControl isRequired isInvalid={invalidPrice}>
            <FormLabel fontSize={10}>Preço do produto</FormLabel>
            <Input
              w={["270px", "380px", "400px", "600px"]}
              h={"50px"}
              placeholder={"adicione o preço do produto"}
              _placeholder={{ color: "gray" }}
              border={"1px"}
              borderColor={"theme.gray50"}
              boxShadow={"md"}
              {...register("price")}
              value={price}
              onChange={handlePrice as any}
            />
          </FormControl>

          <FormControl isRequired isInvalid={invalidCategory}>
            <FormLabel fontSize={10}>Escolha a categoria</FormLabel>
            <Select
              w={["270px", "380px", "400px", "600px"]}
              h={"50px"}
              placeholder={"Selecione uma categoria"}
              _placeholder={{ color: "gray" }}
              border={"1px"}
              borderColor={"theme.gray50"}
              boxShadow={"md"}
              {...register("category_id")}
              value={category}
              onChange={handleCategory as any}
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
          </FormControl>

          <FormControl isRequired isInvalid={invalidProtein}>
            <FormLabel fontSize={10}>Escolha uma proteína</FormLabel>
            <Select
              w={["270px", "380px", "400px", "600px"]}
              h={"50px"}
              placeholder={"Selecione uma proteína"}
              _placeholder={{ color: "gray" }}
              border={"1px"}
              borderColor={"theme.gray50"}
              boxShadow={"md"}
              {...register("protein")}
              value={protein}
              onChange={handleProtein as any}
            >
              <option value={"carne"}>{"carne"}</option>
              <option value={"frango"}>{"frango"}</option>
              <option value={"nenhuma"}>{"nenhuma"}</option>
            </Select>
          </FormControl>

          <FormControl isRequired isInvalid={invalidSize}>
            <FormLabel fontSize={10}>Escolha o tamanho</FormLabel>
            <Select
              w={["270px", "380px", "400px", "600px"]}
              h={"50px"}
              placeholder={"Selecione o tamanho"}
              _placeholder={{ color: "gray" }}
              border={"1px"}
              borderColor={"theme.gray50"}
              boxShadow={"md"}
              {...register("hungryLevel")}
              value={size}
              onChange={handleSize as any}
            >
              <option value={"pequeno"}>{"pequeno"}</option>
              <option value={"medio"}>{"medio"}</option>
              <option value={"grande"}>{"grande"}</option>
            </Select>
          </FormControl>

          <FormControl isRequired isInvalid={invalidDescription}>
            <FormLabel fontSize={10}>Faça a descrição do produto</FormLabel>
            <Input
              w={["270px", "380px", "400px", "600px"]}
              h={"80px"}
              placeholder={"descrição do produto"}
              _placeholder={{ color: "gray" }}
              border={"1px"}
              borderColor={"theme.gray50"}
              boxShadow={"md"}
              {...register("description")}
              value={description}
              onChange={handleDescription as any}
            />
          </FormControl>
          {isInvalid ? (
            <>
              {" "}
              <Button
                w={["270px", "380px", "400px", "600px"]}
                h={"50px"}
                color={"theme.white"}
                children={"Criar produto"}
                bg={"gray.200"}
                _hover={{ color: "white", bg: "gray.200" }}
                onClick={handleShowError}
              />
            </>
          ) : (
            <>
              {" "}
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
            </>
          )}
        </VStack>
      </Center>
    </>
  );
};
