import React from "react";
import { Counter } from "./features/counter/Counter";
import Video from "./features/video/Video";
import "./App.css";

function App(props) {
  const { credentials } = props;

  return (
    <div className="App">
      <Counter />
      <Video credentials={credentials} />
    </div>
  );
}

export default App;
