import React from "react";
import SessionControl from "./features/Session_Controller/SessionControl";

export default function Landing(props) {
  const { credentials } = props;
  return (
    <div className="landingPage">
      <div className="prepArea">Bam</div>
      <div className="roomList">
        <SessionControl credentials={credentials} />
      </div>
    </div>
  );
}
