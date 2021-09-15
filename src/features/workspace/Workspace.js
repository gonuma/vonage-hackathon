import React, { useEffect, useState } from "react";
import Video from "../video/Video";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { yellow } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  workspace: {
    width: "60%",
    height: "40rem",
  },
  doc: {
    width: "100%",
    height: "100%",
  },
}));

export function Workspace(props) {
  const { credentials } = props;
  const classes = useStyles();
  const files = useSelector((state) => state.files);

  return (
    <div className={classes.workspace}>
      {files.currentSelected ? (
        <iframe
          src={`https://docs.google.com/document/d/1NhNv4DdTXERbkZfJJQUvFxcGYD62diFyuBfh1JDOLC4/edit?usp=sharing`}
          className={classes.doc}
        ></iframe>
      ) : null}
      <div className="videoContainer">
        <Video credentials={credentials} />
      </div>
    </div>
  );
}
