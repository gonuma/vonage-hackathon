import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchAllFiles } from "./filesSlice";
import { fetchWorkspaces } from "./workspaceSlice";

export const fetchWorkspaces = createAsyncThunk(
  'users/fetchWorkspaces',
  async (object) => {
    const response = await axios.get(`/api/workspaces/`)
    return response.data
  }
)



export const usersSlice = createSlice({
  name: "users",
  initialState: {selectedUser: 1, workspaces: null, selectedWorkspace: null, files: null, selectedWorkspaceFiles: null, selectedFile: null}, 
  reducers: {
    getWorkspaces: fetchWorkspaces(),
    getFiles: fetchAllFiles(),


  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkspaces.fulfilled, (state, action) => {
        state.workspaces = action.payload.filter((file) )
      })
  }
})

export const { getUsers } = usersSlice.actions;


export default usersSlice.reducer;