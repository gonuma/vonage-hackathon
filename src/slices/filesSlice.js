import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllFiles = createAsyncThunk(
  'files/fetchAllFiles',
  async (object) => {
    const response = await axios.get(`/api/files/`) 
    return response.data
  }
)

export const patchFileName = createAsyncThunk(
  'files/patchFileName',
  async (object) => {
    console.log("response")
    const response = await axios.patch(`/api/files/${object.id}/?name=${object.name}`) 
    return response.data
  }
)

export const deleteFile = createAsyncThunk(
  'files/deleteFile',
  async (object) => {
    console.log("delete")
    console.log(object)
    const response = await axios.delete(`/api/files/${object.id}`) 
    return response.data
  }
)

export const postFile = createAsyncThunk(
  'files/postFile',
  async (object) => {
    console.log("post")
    console.log(object)
    const response = await axios.post(`/api/files/?name=${object.name}&workspace_id=${object.workspaceId}&srcstring=${object.srcstring}`) 
    return response.data
  }
)

export const fetchWorkspaceFiles = createAsyncThunk(
  'files/getWorkspaceFiles',
  async (workspaceId) => {
    console.log("getWorkspaceFiles")
    const response = await axios.get(`/api/files/?workspace_id=${workspaceId}`) 
    return response.data
  }
)

export const filesSlice = createSlice({
  name: "files",
  initialState: {all: null, currentGroup: null, currentFile: null}, 
  reducers: {
    getAllFiles: fetchAllFiles(),
    setCurrentFile: (state, action) => {
      state.currentFile = action.payload
    },
    setCurrentGroup: (state, action) => {
      state.currentGroup = action.payload
    },
    changeFileName: patchFileName(),
    removeFile: deleteFile(),
    addFile: postFile(),
    getWorkspaceFiles: fetchWorkspaceFiles(),


  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkspaceFiles.fulfilled, (state, action) => {
        state.all = action.payload
      })
      .addCase(fetchAllFiles.fulfilled, (state, action) => {
        state.all = action.payload;
      })
      .addCase(patchFileName.fulfilled, (state, action) => {
        state.all = action.payload;
        state.currentGroup = action.payload;
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.all = action.payload;
        state.currentGroup = action.payload;
      })
  }
})

export const { getAllFiles, setCurrentFile, removeFile, addFile, setCurrentGroup } = filesSlice.actions;

export const selectCurrentGroup = (state) => state.files.currentGroup;

export default filesSlice.reducer;