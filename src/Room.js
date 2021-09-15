import React from "react";
import { Workspace } from "./features/workspace/Workspace";
import Video from "./features/video/Video";

export default function Room(props) {
  const { credentials } = props;
  return (
    <div>
      <Workspace />
      <div className="videoContainer">
        <Video credentials={credentials} />
      </div>
    </div>
  );
}
