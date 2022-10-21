import {
  FormControl,
  InputGroup,
  Input as ChakraInput,
  FormLabel,
  FormErrorMessage,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";
import { FieldError } from "react-hook-form";
import { IconType } from "react-icons";
import {
  useState,
  useEffect,
  ForwardRefRenderFunction,
  forwardRef,
} from "react";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError | null;
  icon?: IconType;
}

type inputVariationOptions = {
  [key: string]: string;
};

const inputVariation: inputVariationOptions = {
  error: "negative.main",
  default: "rgba(88, 90, 89, 0.17)",
  success: "success.main",
};

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, icon: Icon, error = null, ...rest },
  ref
) => {
  const [value, setValue] = useState("");
  const [variation, setVariation] = useState("default");

  useEffect(() => {
    if (error) {
      return setVariation("error");
    }
    if (value.length > 1 && !error) {
      return setVariation("success");
    }
  }, [error, value]);

  return (
    <FormControl isInvalid={!!error} isRequired>
      {!!label && <FormLabel fontSize={[12, 18]}>{label}</FormLabel>}
      <InputGroup flexDirection="column">
        <ChakraInput
          id={name}
          name={name}
          onChangeCapture={(e) => setValue(e.currentTarget.value)}
          bgColor="rgba(233, 244, 239, 0.17)"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          borderColor={inputVariation[variation]}
          border="1px solid"
          _placeholder={{ color: "gray.300" }}
          _focus={
            variation === "default"
              ? {
                  borderColor: "#565756",
                }
              : {
                  borderColor: `${inputVariation[variation]}`,
                }
          }
          _hover={{
            borderColor: "#373737",
          }}
          variant="outline"
          size="lg"
          h="40px"
          w={["200px", "420px"]}
          ref={ref}
          {...rest}
        />
        {!!error && (
          <FormErrorMessage color="theme.red" fontSize={"12px"}>
            {error.message}
          </FormErrorMessage>
        )}
      </InputGroup>
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
