import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    theme: {
      white: "#FFFF",
      red: "#9F0101",
      wine: "#5B0101",
      pink: "#F39494",
      orange: "#F69420",
      gray50: "#ECE7E7",
      gray100: "#8A7F7F",
      grafit: "#211D1D",
      yellow: "#F8E00C",
      green: "#74F80C",
      blue: "#0CBFF8",
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
