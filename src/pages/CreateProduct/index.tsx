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
import { RiImageAddFill } from "react-icons/ri";
import { TextArea } from "../../components/Input";
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
  const [categoryData, setCategoryData] = useState([]);

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

  return (
    <>
      <Header />
      <Box h={"1070px"}>
        <VStack className={""} mt={30} spacing={6} justifyContent={"center"}>
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

            <Input
              w={["270px", "380px", "400px", "600px"]}
              h={"50px"}
              placeholder={"coloque aqui a url da imagem escolhida"}
              border={"none"}
              boxShadow={"md"}
              type={"text"}
              {...register("image")}
              value={imageURL}
              onChange={handleInputChangeImage}
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
            <option value={"pequeno"}>{"pequeno"}</option>
            <option value={"medio"}>{"medio"}</option>
            <option value={"grande"}>{"grande"}</option>
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
      </Box>
    </>
  );
};
