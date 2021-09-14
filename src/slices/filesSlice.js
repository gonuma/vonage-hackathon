import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllFiles = createAsyncThunk(
  'files/fetchAllFiles',
  async (object) => {
    console.log("response")
    const response = await axios.get(`/api/files/`) 
    return response.data
  }
)

export const filesSlice = createSlice({
  name: "files",
  initialState: {all: null, currentGroup: null, currentSelected: null}, 
  reducers: {
    getAllFiles: fetchAllFiles(),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFiles.fulfilled, (state, action) => {
        console.log("fulfilled")
        console.log(action.payload)
        state.all = action.payload;
        state.currentGroup = action.payload; // TEMPORARY FOR TESTING
        state.currentSelected = action.payload[0] // TEMPORARY FOR TESTING
      })
  }
})

export const { getAllFiles } = filesSlice.actions;


export default filesSlice.reducer;
