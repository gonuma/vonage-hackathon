import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, Checkbox, ListItemText, FormControl, FormLabel, FormGroup, FormControlLabel, FormHelperText } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  workspaceSetup: {
    width:"60%",
    height:"40rem",
    margin: "2rem",

  },
  doc: {
    width:"100%",
    height:"100%"
  }
}));

export function WorkspaceSetup() {
  const classes = useStyles();
  const files = useSelector((state) => state.files)

  
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { gilad, jason, antoine } = state;
  const error = [gilad, jason, antoine].filter((v) => v).length !== 2;

  /*
1. CHOOSE ROOM TO EDIT
- Need a list of rooms
2. CHOOSE USERS & CHOOSE FILES
- Need a list of users and a list of files
3. SAVE SELECTION
- Update the database
  */

  
  return (
    <div className={classes.workspaceSetup}>
      <div>
        <h4>Files</h4> 
        <FormControl required error={error} component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Pick two</FormLabel>
          <FormGroup>
            {files.all.map((file) => (
              <FormControlLabel
                control={<Checkbox checked={gilad} onChange={handleChange} name="gilad" />}
                label={file.name}
              />
            ))}
            
          </FormGroup>
          <FormHelperText>You can display an error</FormHelperText>
        </FormControl>
      </div>
    </div>
  )
      
    
  
  
}