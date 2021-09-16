import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AddCircle from '@material-ui/icons/AddCircle'
import RemoveCircle from '@material-ui/icons/RemoveCircle'
import { blueGrey, yellow } from '@material-ui/core/colors';
import { List, ListItem, ListItemText, TextField, Popover, Typography, Button } from '@material-ui/core';
import { patchFileName, setCurrentFile, deleteFile, postFile } from '../../slices/filesSlice';
import EditIcon from '@material-ui/icons/Edit';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles((theme) => ({
  control: {
    minWidth: "20%",
    margin: "2rem",
    backgroundColor: blueGrey[50],
  },
  selectedFile: {
    backgroundColor: blueGrey[100]
  },
  typography: {
    padding: theme.spacing(2),
  },
}));

export function WorkspaceControl() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const files = useSelector((state) => state.files)
  const [editing, setEditing] = useState(null)
  const [fileName, setFileName] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const [name, setName] = useState(null)
  const [url, setUrl] = useState(null)


  const fileClickHandler = (file) => {
    console.log(file)
    dispatch(setCurrentFile(file))

  }

  const addClickHandler = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const editClickHandler = (file) => {
    console.log(editing)
    setEditing(file.id)
    setFileName(file.name)
  }

  const editOnChangeHandler = (e) => {
    setFileName(e.target.value)
  }

  const saveClickHandler = (file) => {
    dispatch(patchFileName({id: file.id, name: fileName}))
    setEditing(null)
  }

  const deleteClickHandler = (file) => {
    dispatch(deleteFile(file))
  }

  const changeHandler = (event, field) => {
    if (field === "name")
    setName(event.target.value)
    if (field === "url")
    setUrl(event.target.value)
  }


  const submit = async (event) => {
    dispatch(postFile({name: name, srcstring: url, workspaceId: 1 /* temporary hardcode of workspaceId */}))
    await setAnchorEl(null);
    await setName(null);
    await setUrl(null);
  }
  
  return (
    <div className={classes.control}>
      <div>
        <AddCircle onClick={(e) => addClickHandler(e)}/>
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
      </div>
      <List>
        {files.currentGroup ? files.currentGroup.map(file => (
          <ListItem key={`list_item_${file.id}`} divider={true} onClick={(e) => fileClickHandler(file)} className={files.currentFile.id === file.id ? classes.selectedFile : null}>
            {editing === file.id ? <TextField value={fileName} onChange={(e) => editOnChangeHandler(e)}/> : <ListItemText primary={file.name}/> }
            {editing === file.id ? <CheckCircleIcon onClick={(e) => saveClickHandler(file)} /> : <EditIcon onClick={(e) => editClickHandler(file)}/> }
            <RemoveCircle onClick={(e) => deleteClickHandler(file)}/>
          </ListItem>
        )) : null}
      </List>
    </div>
  )
  
}