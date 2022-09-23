import {
  VStack,
  Text,
  Button,
  HStack,
  Image,
  Box,
  FormControl,
  FormLabel,
  Flex,
  color,
  useToast,
} from "@chakra-ui/react";

import { useHistory } from "react-router-dom";
import { Input } from "../../Input";
import { Select } from "../../Select";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { api } from "../../../services";
import * as yup from "yup";
import { setLocale } from "yup";
import { useCallback, useEffect, useState } from "react";
import { RiImageAddFill } from "react-icons/ri";

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
  image: string;
}

setLocale({
  mixed: {
    notType: "${path} is required",
  },
});

const editProductSchema = yup.object().shape({
  name: yup.string().required(" nome obrigatório"),
  description: yup.string().required(" descrição obrigatória"),
  category_id: yup.string().required("categoria obrigatório"),
  hungryLevel: yup.string().required("tamanho obrigatório"),
  price: yup.string().required("preço obrigatório"),
  protein: yup.string().required("proteina obrigatória"),
  image: yup.string().required("imagem obrigatória"),
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
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<EditProductData>({
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
      <Box>
        <VStack spacing={5}>
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
            placeholder={"coloque aqui a url da imagem escolhida"}
            {...register("image")}
            onChange={handleInputChangeImage}
            defaultValue={file}
            label={"URL da imagem"}
            error={errors.image}
          />

          <Input
            placeholder={"nome do produto"}
            {...register("name")}
            defaultValue={name}
            label={"Nome do produto"}
            error={errors.name}
          />

          <Input
            placeholder={"preço do produto"}
            {...register("price")}
            defaultValue={price}
            label={"Nome"}
            error={errors.name}
          />

          <Select
            placeholder={"Selecione uma categoria"}
            {...register("category_id")}
            defaultValue={category_id}
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
            defaultValue={protein}
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
            defaultValue={hungryLevel}
            label={"Tamanho"}
            error={errors.hungryLevel}
          >
            <option value={"grande"}>{"grande"}</option>
            <option value={"medio"}>{"medio"}</option>
            <option value={"pequeno"}>{"pequeno"}</option>
          </Select>

          <Input
            placeholder={"descrição do produto"}
            {...register("description")}
            defaultValue={description}
            label={"Descrição"}
            error={errors.description}
          />

          <Button
            w={["200px", "400px"]}
            h={"50px"}
            color={"theme.white"}
            children={"Editar produto"}
            bg={"theme.red"}
            _hover={{ color: "black", bg: "white", border: "2px" }}
            type={"submit"}
            onClick={handleSubmit(handleEdit as any)}
          />
        </VStack>
      </Box>
    </>
  );
};
