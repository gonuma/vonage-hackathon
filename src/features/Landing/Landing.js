import React from "react";
import NewId from "../ID_Generator/NewId";

export default function Landing(props) {
  const { credentials } = props;
  return (
    <div>
      <NewId credentials={credentials} />
    </div>
  );
}
