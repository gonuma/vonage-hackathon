import React from "react";
import SessionControl from "./features/Session_Controller/SessionControl";
import { WorkspaceSetup } from "./features/workspaceSetup/WorkspaceSetup";

export default function Landing(props) {
  const { credentials } = props;
  return (
    <div className="landingPage">
      <div className="prepArea">
        <WorkspaceSetup />
      </div>
      <div className="roomList">
        <SessionControl credentials={credentials} />
      </div>
    </div>
  );
}
