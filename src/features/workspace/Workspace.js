import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { yellow } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
  workspace: {
    width:"60%",
    height:"40rem",
    margin: "2rem",

  },
  doc: {
    width:"100%",
    height:"100%"
  }
}));

export function Workspace() {
  const classes = useStyles();
  const files = useSelector((state) => state.files)
  
  if (!files.currentGroup) {
    return null
  } else {
    return (
      <div className={classes.workspace}>
        {files.currentGroup.map((file) => (
          <iframe src={`https://docs.google.com/${file.srcstring}`} className={classes.doc} style={files.currentFile.id === file.id ? null : {display: "none"} }></iframe>
        ))}
      </div>
    )
  }
  
  
}
