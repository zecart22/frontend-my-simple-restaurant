import {
  FormControl,
  InputGroup,
  Input as ChakraInput,
  Select as ChakraSelect,
  FormLabel,
  FormErrorMessage,
  SelectProps as ChakraSelectProps,
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

interface SelectProps extends ChakraSelectProps {
  name: string;
  label?: string;
  error?: FieldError | null;
}

type selectVariationOptions = {
  [key: string]: string;
};

const selectVariation: selectVariationOptions = {
  error: "negative.main",
  default: "rgba(88, 90, 89, 0.17)",
  success: "success.main",
};

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  { name, label, error = null, ...rest },
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
      {!!label && <FormLabel>{label}</FormLabel>}
      <InputGroup flexDirection="column">
        <ChakraSelect
          id={name}
          name={name}
          onChangeCapture={(e) => setValue(e.currentTarget.value)}
          bgColor="rgba(233, 244, 239, 0.17)"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          borderColor={selectVariation[variation]}
          border="1px solid"
          _placeholder={{ color: "gray.300" }}
          _focus={
            variation === "default"
              ? {
                  borderColor: "#565756",
                }
              : {
                  borderColor: `${selectVariation[variation]}`,
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
          <FormErrorMessage color="theme.red">{error.message}</FormErrorMessage>
        )}
      </InputGroup>
    </FormControl>
  );
};

export const Select = forwardRef(SelectBase);
