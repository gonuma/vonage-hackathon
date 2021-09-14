
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Video from "./features/video/Video";
import { Workspace } from "./features/workspace/Workspace"
import { WorkspaceControl } from "./features/workspaceControl/WorkspaceControl";
import { fetchAllFiles } from "./slices/filesSlice";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllFiles())
  }, [])

  return (
    <div className="App">
      <div style={{display:"flex"}}>
        <WorkspaceControl />
        <Workspace />
      </div>
      <Video />
    </div>
  );

}

export default App;
