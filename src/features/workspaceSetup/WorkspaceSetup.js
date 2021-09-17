import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, Checkbox, ListItemText, FormControl, FormLabel, FormGroup, FormControlLabel, FormHelperText, Button, Typography, Popover, TextField } from '@material-ui/core';
import { postWorkspace, postUserToWorkspace, deleteUserFromWorkspace, patchWorkspaceName, deleteWorkspace } from '../../slices/workspacesSlice';
import { RemoveCircle } from '@material-ui/icons';
import { postFile, deleteFile } from '../../slices/filesSlice'
import { fetchWorkspaces } from '../../slices/userSlice';


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
  const [workspaceName, setWorkspaceName] = useState(null)

  


  
  const saveButtonHandler = (event) => {
    // setState({ ...state, [event.target.name]: event.target.checked });
    setRoom(null)
    dispatch(fetchWorkspaces())
  };

  const handleUserChange = (e, user) => {
    if (e.target.checked) {
      if (workspaces.users_in_workspaces.filter((object) => (object.userId === user.id) && object.workspaceId === room.id).length === 0) {
        dispatch(postUserToWorkspace({userId: user.id, roomId: room.id}))
      }
    } else {
      dispatch(deleteUserFromWorkspace({userId: user.id, roomId: room.id}))
    }
  };


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

  */

//Popover logic
const [anchorEl, setAnchorEl] = useState(null)
const [name, setName] = useState(null)
const [url, setUrl] = useState(null)

const addFileHandler = (e) => {
  setAnchorEl(e.currentTarget)
}

const handleClose = () => {
  setAnchorEl(null);
};

const changeHandler = (event, field) => {
  if (field === "name")
  setName(event.target.value)
  if (field === "url")
  setUrl(event.target.value)
}


const open = Boolean(anchorEl);
const id = open ? 'simple-popover' : undefined;

const submit = async (event) => {
  dispatch(postFile({name: name, srcstring: url, workspaceId: room.id }))
  await setAnchorEl(null);
  await setName(null);
  await setUrl(null);
}
// End of popover logic

const deleteClickHandler = (file) => {
  dispatch(deleteFile(file))
}

const nameChangeHandler = (e, workspace) => {
  setWorkspaceName(e.target.value)
  dispatch(patchWorkspaceName({id: workspace.id, name: e.target.value}))
}

  const addRoomHandler = () => {
    dispatch(postWorkspace(user.selectedUser))
  }
  
  const roomSelectHandler = (workspace) => {
    setRoom(workspace)
    setWorkspaceName(workspace.name)
  }

  const deleteWorkspaceHandler = (id) => {
    console.log(id)
    dispatch(deleteWorkspace(id))
  }
  

  if (user.workspaces && !room) {
    return (
      <div className={classes.roomSelector}>
        <List>
          <h2>Choose a room to configure</h2>
          <Button color="primary" onClick={(e) => addRoomHandler()}> Add a new room</Button>
          {user.workspaces.map((workspace) => (
            <ListItem>
              <ListItemText 
                primary={workspace.name} 
                secondary="time here" 
                onClick={(e) => roomSelectHandler(workspace)}
              />
              <RemoveCircle onClick={(e) => deleteWorkspaceHandler(workspace.id)} />
            </ListItem>
          ))}
        </List>
      </div>
    )

  } else if (room && user.files) {
    return (
      <div className={classes.workspaceSetup}>
        <TextField value={workspaceName} onChange={(e) => nameChangeHandler(e, room)}/>
        <div style={{display:"flex"}}>
          <div>
            <h3>FILES</h3>
            <Button color="primary" onClick={(e) => addFileHandler(e)}> Add a file</Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <Typography className={classes.typography}>
                <h4>Add a new file</h4>
                <TextField variant="outlined" placeholder="name" required onChange={(event) => changeHandler(event, "name")}/>
                <TextField variant="outlined" placeholder="url" onChange={(event) => changeHandler(event, "url")}/>
                <Button variant="contained" onClick={(event) => submit(event)}>Add</Button>
              </Typography>              
            </Popover>
            <h5>Current files:</h5>
              {user.files.filter((file) => file.workspaceId === room.id).map((file) => (
                <ListItem>
                  <ListItemText
                    primary={file.name} 
                  />
                  <RemoveCircle onClick={(e) => deleteClickHandler(file)}/>

                </ListItem>
              ))}
          </div>
          <div>
            <h3>PARTICIPANTS</h3> 
            <FormControl 
              required 
              error={false} 
              component="fieldset" 
              className={classes.formControl}>
              <FormLabel component="legend">Select participants</FormLabel>
              <FormGroup>
                {user.all.filter((person) => user.selectedUser !== person.id).map((user) => (
                  <FormControlLabel
                    control={
                      <Checkbox 
                        onChange={(e) => handleUserChange(e, user)} 
                        name={user.username} 
                      />}
                    label={user.username}
                  />
                ))}
              </FormGroup>
              <FormHelperText>Select users who can join this workspace</FormHelperText>
            </FormControl>
          </div>
        </div>
        <Button variant="contained" onClick={saveButtonHandler}>Save</Button>
      </div>
    )
  } else {
    return null
  }
  
      
    
  
  
}