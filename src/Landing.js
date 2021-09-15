import React from "react";
import SessionControl from "./features/Session_Controller/SessionControl";

export default function Landing(props) {
  const { credentials } = props;
  return (
    <div>
      <SessionControl credentials={credentials} />
    </div>
  );
}
