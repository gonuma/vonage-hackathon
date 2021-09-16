import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Video from "./features/video/Video";
import { Workspace } from "./features/workspace/Workspace";
import { WorkspaceControl } from "./features/workspaceControl/WorkspaceControl"
import { fetchAllFiles } from "./slices/filesSlice";
import "./app.css";
import { WorkspaceSetup } from "./features/workspaceSetup/WorkspaceSetup";
import { fetchWorkspaces, fetchFiles } from "./slices/userSlice";

function App(props) {
  const { credentials } = props;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(fetchWorkspaces())
    dispatch(fetchFiles())
  }, []);

  // useEffect(() => {
    
  // }, [user.workspaces]);

  return (
    <div className="App">
      <button onClick={(e) => console.log(user)}>Test</button>
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
