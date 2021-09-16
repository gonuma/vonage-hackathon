import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { selectCurrentGroup } from "./filesSlice";

export const fetchWorkspaces = createAsyncThunk(
  'user/fetchWorkspaces',
  async (object) => {
    console.log("gettings workspaces")
    const response = await axios.get(`/api/workspaces/`)
    return response.data
  }
)
export const fetchFiles = createAsyncThunk(
  'user/fetchFiles',
  async (object) => {
    console.log("getting files")
    const response = await axios.get(`/api/files/`)
    return response.data
  }
)


export const userSlice = createSlice({
  name: "user",
  initialState: {selectedUser: 1, workspaces: null, selectedWorkspace: null, files: null, selectedWorkspaceFiles: null, selectedFile: null}, 
  reducers: {
    getWorkspaces: fetchWorkspaces(),
    getFiles: fetchFiles(),


  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkspaces.fulfilled, (state, action) => {
        state.workspaces = action.payload.filter((workspace) => {
          return workspace.userId === state.selectedUser
        })
      })
      .addCase(fetchFiles.fulfilled, (state, action) => {
        state.files = action.payload.filter((file) => {
          for (const workspace of state.workspaces) {
            if (workspace.id === file.workspaceId) return true
          }
          return false
        })
      })
  }
})


export const {  } = userSlice.actions;

export const selectedUser = (state) => state.user.selectedUser

export default userSlice.reducer;