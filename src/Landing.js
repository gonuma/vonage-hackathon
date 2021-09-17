import React from "react";
import SessionControl from "./features/Session_Controller/SessionControl";
import { WorkspaceSetup } from "./features/workspaceSetup/WorkspaceSetup";

import { Grid, Box } from "@material-ui/core";
import theme from "./materialUI/theme";
import { ThemeProvider } from "@material-ui/core";

export default function Landing(props) {
  const { credentials } = props;
  return (

    <ThemeProvider theme={theme}>
      <Grid container>
        {/* <div className="landingPage"> */}a<Grid item xs={10}></Grid>
        {/* <div className="prepArea">Bam</div> */}
        <Grid
          item
          // xs={2}
          // margin="auto"
          // style={{ margin: "auto", padding: 15, backgroundColor: "darkgray" }}
        >
          <Box
            sx={{
              width: "15vw",
              height: "80vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              bgcolor: "primary.dark",
            }}
          >
            {/* <div className="roomList"> */}
            <SessionControl credentials={credentials} />
            {/* </div> */}
            {/* </div> */}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>

  );
}
