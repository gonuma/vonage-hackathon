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

export const { getAllFiles, setCurrentFile, removeFile } = filesSlice.actions;


export default filesSlice.reducer;