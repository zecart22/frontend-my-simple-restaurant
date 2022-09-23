import {
  VStack,
  Text,
  Button,
  HStack,
  Image,
  useToast,
  Center,
  Box,
  Flex,
} from "@chakra-ui/react";
import { RiImageAddFill } from "react-icons/ri";

import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { Link, useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { api } from "../../services";
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
  image: string;
}

setLocale({
  mixed: {
    notType: "${path} is required",
  },
});

const createProductSchema = yup.object().shape({
  name: yup.string().required(" nome obrigatório"),
  description: yup.string().required(" descrição obrigatória"),
  category_id: yup.string().required(" categoria  obrigatório"),
  hungryLevel: yup.string().required(" tamanho obrigatório"),
  price: yup.string().required("preço obrigatório"),
  protein: yup.string().required("proteína obrigatório"),
  image: yup.string().required("url da imagem obrigatório"),
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
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<CreatProductData>({
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
    <Center flexDirection={"column"}>
      <Header />
      <Box
        w={["230px", "450px"]}
        bg={"theme.white"}
        color={"theme.grafit"}
        mt={10}
        mb={10}
      >
        <VStack spacing={5}>
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
          </VStack>
          <Input
            placeholder={"coloque aqui a url da imagem escolhida"}
            {...register("image")}
            onChange={handleInputChangeImage}
            label={"URL da Imagem"}
            error={errors.image}
          />
          <Input
            placeholder={"adicione um nome para o produto"}
            {...register("name")}
            label={"Nome do produto"}
            error={errors.name}
          />

          <Input
            placeholder={"adicione o preço do produto"}
            {...register("price")}
            label={"Preço"}
            error={errors.price}
          />

          <Select
            placeholder={"Selecione uma categoria"}
            {...register("category_id")}
            label={"Categoria"}
            error={errors.category_id}
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
            placeholder={"Selecione uma proteína"}
            {...register("protein")}
            label={"Proteína"}
            error={errors.protein}
          >
            <option value={"carne"}>{"carne"}</option>
            <option value={"frango"}>{"frango"}</option>
            <option value={"nenhuma"}>{"nenhuma"}</option>
          </Select>

          <Select
            placeholder={"Selecione o tamanho"}
            {...register("hungryLevel")}
            label={"Tamanho"}
            error={errors.hungryLevel}
          >
            <option value={"pequeno"}>{"pequeno"}</option>
            <option value={"medio"}>{"medio"}</option>
            <option value={"grande"}>{"grande"}</option>
          </Select>

          <Input
            as="textarea"
            placeholder={"descrição do produto"}
            {...register("description")}
            label={"Descrição"}
            error={errors.description}
            h={"100px"}
          />

          <Button
            w={["200px", "400px"]}
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
    </Center>
  );
};
