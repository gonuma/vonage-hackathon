import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Video from "./features/video/Video";
import { Workspace } from "./features/workspace/Workspace";
import { WorkspaceControl } from "./features/workspaceControl/WorkspaceControl"
import { fetchAllFiles } from "./slices/filesSlice";
import "./app.css";
import { WorkspaceSetup } from "./features/workspaceSetup/WorkspaceSetup";

function App(props) {
  const { credentials } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllFiles());
  }, []);

  return (
    <div className="App">
        <WorkspaceSetup />
        <WorkspaceControl />
        <Workspace />
      <div className="videoContainer">
        <Video credentials={credentials} />
      </div>
    </div>
  );
}

export default App;
