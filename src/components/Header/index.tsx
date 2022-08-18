import { Text, useMediaQuery } from "@chakra-ui/react";

export const Header = () => {
  const [isLargerThan1302] = useMediaQuery("(min-width: 1302px)");

  return <Text>Header</Text>;
};
