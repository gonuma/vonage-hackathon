import React from "react";
import { Workspace } from "./features/workspace/Workspace";
import { WorkspaceControl } from "./features/workspaceControl/WorkspaceControl";
import Video from "./features/video/Video";
import { useContext } from "react";
import { ApiKeyContext } from "./App";

import { Grid, Box } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core";
import theme from "./materialUI/theme";

export default function Room(props) {
  const { credentials } = props;
  const apiKey = useContext(ApiKeyContext);
  const dynamicSessionId = props.location.aboutProps.sessionId;
  const dynamicToken = props.location.aboutProps.token;
  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        {/* <Grid item xs={2}>
      </Grid> */}
        <Grid item xs={10}>
          <Workspace />
          <WorkspaceControl />
        </Grid>
        <Grid item xs={2}>
          <Box sx={{ bgcolor: "primary.dark" }}>
            <Video
              apiKey={apiKey.apiKey}
              sessionId={dynamicSessionId}
              token={dynamicToken}
            />
          </Box>
        </Grid>
        <Grid item xs={10}></Grid>
      </Grid>
    </ThemeProvider>
  );
}
