import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { selectCurrentGroup, postFile, deleteFile, } from "./filesSlice";
import { postWorkspace, deleteWorkspace, patchWorkspaceName } from "./workspacesSlice";


export const fetchWorkspaces = createAsyncThunk(
  'user/fetchWorkspaces',
  async (object) => {
    console.log("gettings workspaces")
    const workspaces = await axios.get(`/api/workspaces/`)
    const users_in_workspaces = await axios.get('/api/users_in_workspaces')
    const files = await axios.get(`/api/files/`)
    return {workspaces: workspaces.data, users_in_workspaces: users_in_workspaces.data, files: files.data}
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

export const fetchAllUsers = createAsyncThunk(
  'user/fetchAllUsers',
  async (object) => {
    console.log("getting files")
    const response = await axios.get(`/api/users/`)
    return response.data
  }
)


export const userSlice = createSlice({
  name: "user",
  initialState: {all: null, selectedUser: 1, workspaces: null, files: null}, 
  reducers: {
    getAllUsers: fetchAllUsers(),
    getWorkspaces: fetchWorkspaces(),
    getFiles: fetchFiles(),
    setUser: (state, action) => {
      state.selectedUser = action.payload
    }


  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkspaces.fulfilled, (state, action) => {
        //workspaces
        console.log(action.payload)
        state.workspaces = action.payload.users_in_workspaces
          .filter((row) => row.userId === state.selectedUser)
          .map((row) => row.workspaceId)
          .map((id) => {
          return action.payload.workspaces.find((workspace) => workspace.id === id)
        })

        //files
        state.files = action.payload.files.filter((file) => {
          for (const workspace of state.workspaces) {
            if (workspace.id === file.workspaceId) return true
          }
          return false
        })
        // state.workspaces = action.payload.filter((workspace) => {
        //   return workspace.userId === state.selectedUser
        // })
      })
      
      .addCase(postFile.fulfilled, (state, action) => {
        state.files = action.payload.filter((file) => {
          for (const workspace of state.workspaces) {
            if (workspace.id === file.workspaceId) return true
          }
          return false
        })
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.files = action.payload.filter((file) => {
          for (const workspace of state.workspaces) {
            if (workspace.id === file.workspaceId) return true
          }
          return false
        })
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.all = action.payload
      })
      .addCase(postWorkspace.fulfilled, (state, action) => {
        state.workspaces.push(action.payload.workspaces.insertedWorkspace)
      })
      .addCase(deleteWorkspace.fulfilled, (state, action) => {
        const index = state.workspaces.findIndex((workspace) => workspace.id === action.payload)
        state.workspaces.splice(index, 1)
      })
      
      // .addCase(fetchFiles.fulfilled, (state, action) => {
      //   state.files = action.payload.filter((file) => {
      //     for (const workspace of state.workspaces) {
      //       if (workspace.id === file.workspaceId) return true
      //     }
      //     return false
      //   })
      // })
  }
})


export const { setUser } = userSlice.actions;

export const selectedUser = (state) => state.user.selectedUser

export default userSlice.reducer;