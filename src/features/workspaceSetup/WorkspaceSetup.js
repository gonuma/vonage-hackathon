import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, Checkbox, ListItemText, FormControl, FormLabel, FormGroup, FormControlLabel, FormHelperText, Button } from '@material-ui/core';
import { postWorkspace } from '../../slices/workspacesSlice';


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
  const user = useSelector((state) => state.user)
  const workspaces = useSelector((state) => state.workspaces)
  const [room, setRoom] = useState(null)
  const dispatch = useDispatch();
  const [selectedFiles, setSelectedFiles] = useState([])

  
  const clickHandler = (event) => {
    // setState({ ...state, [event.target.name]: event.target.checked });
    console.log(user.files)
    console.log(room.id)
    console.log(selectedFiles)
  };
  const handleChange = (event, tuple, index, array) => {
    tuple[1] = !tuple[1]
    array.splice(index, 1, tuple)
    console.log(array)
    setSelectedFiles(array)
  };

  useEffect(() => {

  }, [selectedFiles])

  const error = selectedFiles.filter((tuple) => tuple[1] === true).length < 1;

  /*
1. CHOOSE ROOM TO EDIT
- Need a list of rooms
2. CHOOSE USERS & CHOOSE FILES
- Need a list of users and a list of files
3. SAVE SELECTION
- Update the database

Assign users to workspace
Assign files to a workspace
Name to a workspace
Time

  */

  const addRoomHandler = () => {
    dispatch(postWorkspace(user.selectedUser))
  }
  
  const roomSelectHandler = (workspace) => {
    setRoom(workspace)
    setSelectedFiles(user.files.map((file) => [file, file.workspaceId === workspace.id ? true : false]))
  }

  if (user.workspaces && !room) {
    return (
      <div className={classes.roomSelector}>
        <List>
          <h2>Choose a room to configure</h2>
          <Button color="primary" onClick={(e) => addRoomHandler()}> Add a new room</Button>
          {user.workspaces.map((workspace) => (
            <ListItemText 
              primary={workspace.name} 
              secondary="time here" 
              onClick={(e) => roomSelectHandler(workspace)}
            />
          ))}
        </List>
      </div>
    )

  } else if (selectedFiles && user.files) {
    return (
      <div className={classes.workspaceSetup}>
        <button onClick={clickHandler}>Test2</button>
        <div>
          <h4>Files</h4> 
          <FormControl 
            required 
            error={error} 
            component="fieldset" 
            className={classes.formControl}>
            <FormLabel component="legend">Select files</FormLabel>
            <FormGroup>
              {selectedFiles.map((tuple, index, array) => (
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={tuple[1]}
                      onChange={(e) => handleChange(e, tuple, index, array)} 
                      name={tuple[0].name} 
                    />}
                  label={tuple[0].name}
                />
              ))}
              
            </FormGroup>
            <FormHelperText>Please select at least one file to include in the workspace</FormHelperText>
          </FormControl>
        </div>
      </div>
    )
  } else {
    return null
  }
  
      
    
  
  
}