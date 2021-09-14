import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Video from "./features/video/Video";
import { Workspace } from "./features/workspace/Workspace";
import { fetchAllFiles } from "./slices/filesSlice";
import "./app.css";

function App(props) {
  const { credentials } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllFiles());
  }, []);

  return (
    <div className="App">
      <Workspace />
      <div className="videoContainer">
        <Video credentials={credentials} />
      </div>
    </div>
  );
}

export default App;
