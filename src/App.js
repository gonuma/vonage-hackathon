import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Video from "./features/video/Video";
import { Workspace } from "./features/workspace/Workspace"
import { WorkspaceControl } from "./features/workspaceControl/WorkspaceControl";
import { fetchAllFiles } from "./slices/filesSlice";
import NewId from "./features/ID_Generator/NewId";


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllFiles())
  }, [])

  return (
    <div className="App">
      <div>
        <WorkspaceControl />
        <Workspace />
      </div>
      <div className="videoContainer">
        <NewId credentials={credentials} />
        <Video credentials={credentials} />
      </div>
    </div>
  );

}

export default App;
