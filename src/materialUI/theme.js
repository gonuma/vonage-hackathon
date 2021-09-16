import { createTheme } from "@material-ui/core/styles";

//link to code pen https://codepen.io/yukitomeow/pen/NWgaYZO

const theme = createTheme({
  palette: {
    primary: {
      //khaki
      light: "#ffffff",
      main: "#daddd6",
      dark: "#a8aba5",
      contrastText: "#000", //bk
    },
    secondary: {
      //green
      light: "#97c3cd",
      main: "#68939c",
      dark: "#3b656e",
      contrastText: "#000", // bk
    },
  },
});

export default theme;
