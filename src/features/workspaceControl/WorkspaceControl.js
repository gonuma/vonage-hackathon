import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AddCircle from '@material-ui/icons/AddCircle'
import RemoveCircle from '@material-ui/icons/RemoveCircle'
import { blueGrey, yellow } from '@material-ui/core/colors';
import { List, ListItem, ListItemText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  control: {
    minWidth: "20%",
    margin: "2rem",
    backgroundColor: blueGrey[50],
  }
}));

export function WorkspaceControl() {
  const classes = useStyles();
  const files = useSelector((state) => state.files)
  
  return (
    <div className={classes.control}>
      <div>
        <AddCircle />
        <RemoveCircle />
      </div>
      <List>
        {files.currentGroup ? files.currentGroup.map(file => (
          <ListItem divider={true}>
            <ListItemText primary={file.name} />
          </ListItem>
        )) : null}
      </List>
    </div>
  )
  
}
