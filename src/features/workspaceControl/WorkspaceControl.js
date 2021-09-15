import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AddCircle from '@material-ui/icons/AddCircle'
import RemoveCircle from '@material-ui/icons/RemoveCircle'
import { blueGrey, yellow } from '@material-ui/core/colors';
import { List, ListItem, ListItemText, TextField } from '@material-ui/core';
import { patchFileName, setCurrentFile, deleteFile } from '../../slices/filesSlice';
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
  }
}));

export function WorkspaceControl() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const files = useSelector((state) => state.files)
  const [editing, setEditing] = useState(null)
  const [fileName, setFileName] = useState(null)

  const fileClickHandler = (file) => {
    console.log(file)
    dispatch(setCurrentFile(file))

  }

  const addClickHandler = () => {

  }

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
  
  return (
    <div className={classes.control}>
      <div>
        <AddCircle onClick/>
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