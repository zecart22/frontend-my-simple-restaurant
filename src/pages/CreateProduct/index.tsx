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
} from "@chakra-ui/react";
import { RiImageAddFill } from "react-icons/ri";
import { TextArea } from "../../components/Input";
import { Header } from "../../components/Header";
import { Link } from "react-router-dom";

export const CreateProduct = () => {
  return (
    <>
      <Header />

      <VStack mt={50} spacing={6} justifyContent={"center"}>
        <HStack spacing={[70, 100]}>
          <Text fontSize={[20, 30]}>Novo produto</Text>
          <Link to={"/listproducts"}>
            <Text fontSize={[15, 20]} color={"theme.red"}>
              Ver todos produtos
            </Text>
          </Link>
        </HStack>
        <VStack>
          <RiImageAddFill size={70} />
          <Text fontSize={15} color={"theme.red"}>
            Adicionar uma imagem
          </Text>
        </VStack>

        <Input
          w={["270px", "380px", "400px", "600px"]}
          h={"50px"}
          placeholder={"digite o número da mesa"}
          border={"1px"}
          borderColor={"theme.gray50"}
          boxShadow={"md"}
        />

        <Input
          w={["270px", "380px", "400px", "600px"]}
          h={"50px"}
          placeholder={"digite o nome do cliente"}
          border={"1px"}
          borderColor={"theme.gray50"}
          boxShadow={"md"}
        />

        <Select
          w={["270px", "380px", "400px", "600px"]}
          h={"50px"}
          placeholder={"Selecione uma categoria"}
          border={"1px"}
          borderColor={"theme.gray50"}
          boxShadow={"md"}
        >
          {/*   {categories&&getEnabledCategories.map((category)=>
          
          <option value={category}>{category}</option>

          )} */}
        </Select>

        <Select
          w={["270px", "380px", "400px", "600px"]}
          h={"50px"}
          placeholder={"Selecione uma proteína"}
          border={"1px"}
          borderColor={"theme.gray50"}
          boxShadow={"md"}
        >
          <option value={"carne"}>{"carne"}</option>
          <option value={"frango"}>{"frango"}</option>
        </Select>

        <Select
          w={["270px", "380px", "400px", "600px"]}
          h={"50px"}
          placeholder={"Selecione o tamanho"}
          border={"1px"}
          borderColor={"theme.gray50"}
          boxShadow={"md"}
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
        />

        <Button
          w={["270px", "380px", "400px", "600px"]}
          h={"50px"}
          color={"theme.grafit"}
          children={"Criar produto"}
          bg={"theme.green"}
        />
      </VStack>
    </>
  );
};
