import React from "react";
import theme from "../../materialUI/theme";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logo from "./img/logo.png";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        onClick={() => {
          console.log("do something to render");
        }}
        sx={{ height: "100vh", bgcolor: "primary.main" }}
      >
        <Grid container justifyContent="center">
          <Box
            mt={30}
            sx={{ verticalAlign: "center", bgcolor: "primary.main" }}
          >
            <img src={logo} />
          </Box>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
