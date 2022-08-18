import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    theme: {
      white: "#FFFF",
      black: "#0A0404",
      red: "#F20606",
      blue: "#00B9FF",
      gray: "#D9D9D9",
    },
    gray: {
      0: "#f5f5f5",
      10: "#F2ECEC",
      50: "#F4EAEA",
      100: "#e0e0e0",
      300: "#828282",
      600: "#464646",
    },
  },

  styles: {
    global: {
      body: {
        bg: "theme.white",
        color: "gray.600",
      },
    },
  },
});

export default theme;
