import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function NewId(props) {
  const { credentials } = props;
  const workspace = useSelector((state) => state.files.all);

  const VonageVideo = require("opentok");
  const vonageVideo = new VonageVideo(credentials.apiKey, credentials.secret);

  // const generateId = () => {
  //   vonageVideo.createSession((err, session) => {
  //     console.log(session.sessionId);
  //   });
  // };

  return (
    <div>
      <button
        onClick={() => {
          console.log(credentials);
          vonageVideo.createSession((err, session) => {
            // console.log(session.sessionId);
            // console.log(workspace[0].workspaceId);
            axios
              .post(
                `/api/workspaces/${workspace[0].workspaceId}/${session.sessionId}`
              )
              .then((res) => console.log(res));
          });
        }}
      >
        Generate ID
      </button>
    </div>
  );
}
