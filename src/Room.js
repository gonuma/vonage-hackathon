import React from "react";
import { Workspace } from "./features/workspace/Workspace";
import { WorkspaceControl } from "./features/workspaceControl/WorkspaceControl";
import Video from "./features/video/Video";
import { useContext } from "react";
import { ApiKeyContext } from "./App";

import { Grid } from "@material-ui/core";

export default function Room(props) {
  const { credentials } = props;
  const apiKey = useContext(ApiKeyContext);
  const dynamicSessionId = props.location.aboutProps.sessionId;
  const dynamicToken = props.location.aboutProps.token;
  return (
    <Grid container>
      {/* <Grid item xs={2}>
      </Grid> */}
      <Grid item xs={10}>
        <Workspace />
      </Grid>
      <Grid item xs={2}>
        <Video
          apiKey={apiKey.apiKey}
          sessionId={dynamicSessionId}
          token={dynamicToken}
        />
      </Grid>
      <Grid item xs={10}>
        <WorkspaceControl />
      </Grid>
    </Grid>
  );
}
