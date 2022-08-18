import {
  Input as CkakraInput,
  Textarea as CkakraTextarea,
  InputProps,
  TextareaProps,
} from "@chakra-ui/react";

export const Input = ({ ...rest }: InputProps) => {
  return (
    <CkakraInput
      w={"350px"}
      h={"50px"}
      border={"2px"}
      borderColor={"theme.grafit"}
      boxShadow={"md"}
      {...rest}
    />
  );
};

export const TextArea = ({ ...rest }: TextareaProps) => {
  return (
    <CkakraTextarea
      w={"500px"}
      h={"150px"}
      border={"2px"}
      borderColor={"theme.grafit"}
      boxShadow={"md"}
      {...rest}
      {...rest}
    ></CkakraTextarea>
  );
};
