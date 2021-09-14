import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { AddCircle } from '@material-ui/icons/AddCircle'
import { RemoveCircle } from '@material-ui/icons/RemoveCircle'
import { yellow } from '@material-ui/core/colors';
import { List, ListItem, ListItemText } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "50%",
    backgroundColor: yellow[100],
  }
}));

export function Workspace() {
  const classes = useStyles();
  const files = useSelector((state) => state.files)
  
  return (
    <div>
      <div>
        <AddCircle />
        <RemoveCircle />
      </div>
      <List>
        {files.currentGroup ? files.currentGroup.map(file => (
          <ListItem>
            <ListItemText>
              Test
            </ListItemText>
          </ListItem>>
        )) : null}
      </List>
    </div>
  )
  
}
