import React from "react";

import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  workspace: {
    height: "79.5vh",
  },
  doc: {
    width: "100%",
    height: "100%",
  },
}));

export function Workspace() {
  const classes = useStyles();
  const files = useSelector((state) => state.files);

  if (!files.currentFile) {
    return null;
  } else {
    return (
      // <div className={classes.workspace}>
      //   {files.currentGroup.map((file) => (
      //     <iframe src={file.srcstring} className={classes.doc} style={files.currentFile.id === file.id ? null : {display: "none"} }></iframe>
      //   ))}
      // </div>

      // CODE ABOVE HAS ERROR WHEN RENDERING DOCS

      <div className={classes.workspace}>
        <iframe
          title="workspace"
          className={classes.doc}
          src={files.currentFile.srcstring}
        ></iframe>
      </div>
    );
  }
}
