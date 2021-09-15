import React from "react";
import { Workspace } from "./features/workspace/Workspace";
import { WorkspaceControl } from "./features/workspaceControl/WorkspaceControl";
import Video from "./features/video/Video";
import { useContext } from "react";
import { ApiKeyContext } from "./App";

export default function Room(props) {
  const { credentials } = props;
  const apiKey = useContext(ApiKeyContext);
  const dynamicSessionId = props.location.aboutProps.sessionId;
  const dynamicToken = props.location.aboutProps.token;
  // console.log(dynamicSessionId);
  // console.log(dynamicToken);
  // console.log(apiKey.apiKey);
  return (
    <div className="roomContainer">
      <WorkspaceControl />
      <div className="workspaceContainer">
        <Workspace />
      </div>
      <div className="videoContainer">
        <Video
          apiKey={apiKey.apiKey}
          sessionId={dynamicSessionId}
          token={dynamicToken}
        />
      </div>
    </div>
  );
}
