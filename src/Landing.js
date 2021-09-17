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
        <Grid item xs={12}>
          <WorkspaceSetup credentials={credentials} />
        </Grid>
        <Grid
          item
          // xs={2}
          // margin="auto"
          // style={{ margin: "auto", padding: 15, backgroundColor: "darkgray" }}
        >
          <Box
            sx={{
              width: "100vw",
              height: "55.2vh",
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
