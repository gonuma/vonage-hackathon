
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Video from "./features/video/Video";
import { Workspace } from "./features/workspace/Workspace"
import { fetchAllFiles } from "./slices/filesSlice";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllFiles())
  }, [])

  return (
    <div className="App">
      <Workspace />
      <Video />
    </div>
  );

}

export default App;
