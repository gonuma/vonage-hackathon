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
    const response = await axios.post(`/api/files/?name=${object.name}&srcstring=${object.srcstring}&workspace_id=${object.workspaceId}`) 
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
    changeFileName: patchFileName(),
    removeFile: deleteFile(),
    addFile: postFile(),
    // addToCurrentGroup: (state, action) => {
    //   let selected = state.all.find((file) => file.id === action.payload)
    //   state.currentGroup.push(selected)
    // },
    // removeFromCurrentGroup: (state, action) => {
    //   let index = state.currentGroup.findIndex((file) => file.id === action.payload)
    //   state.currentGroup.splice(index, 1);
    // },
    setCurrentGroup: (state, action) => {
      state.currentGroup = action.payload.map((fileId) => state.all.find((file) => file.id === fileId))
    }


  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFiles.fulfilled, (state, action) => {
        state.all = action.payload;
        state.currentGroup = action.payload; // TEMPORARY FOR TESTING
        state.currentFile = action.payload[0] // TEMPORARY FOR TESTING
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

export const { getAllFiles, setCurrentFile, removeFile, addFile } = filesSlice.actions;

export const selectCurrentGroup = (state) => state.files.currentGroup;

export default filesSlice.reducer;