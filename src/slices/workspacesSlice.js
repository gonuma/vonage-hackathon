import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWorkspaces = createAsyncThunk(
  'workspaces/fetchWorkspaces',
  async (object) => {
    const response = await axios.get(`/api/workspaces/`) 
    return response.data
  }
)

export const patchWorkspaceName = createAsyncThunk(
  'workspaces/patchWorkspaceName',
  async (object) => {
    console.log("response")
    const response = await axios.patch(`/api/workspaces/${object.id}/?name=${object.name}`) 
    return response.data
  }
)

export const deleteWorkspace = createAsyncThunk(
  'workspaces/deleteWorkspace',
  async (object) => {
    console.log("delete")
    console.log(object)
    const response = await axios.delete(`/api/workspaces/${object.id}`) 
    return response.data
  }
)

export const postWorkspace = createAsyncThunk(
  'workspaces/postWorkspace',
  async (userId) => {
    console.log("post")
    const workspaces = await axios.post(`/api/workspaces/`) 
    const users_in_workspaces = await axios.post(`/api/users_in_workspaces/?user_id=${userId}&room_id=${workspaces.data.insertedWorkspace.id}`) 
    return {workspaces: workspaces.data, users_in_workspaces: users_in_workspaces.data}
  }
)

export const postFileToWorkspace = createAsyncThunk(
  'workspaces/postWorkspace',
  async (userId) => {
    console.log("post")
    const files = await axios.post(`/api/files/`) 
    return files.data
  }
)

export const fetchUsersInWorkspaces = createAsyncThunk(
  'workspaces/fetchUsersInWorkspaces',
  async (object) => {
    console.log("get")
    const users_in_workspaces = await axios.get(`/api/users_in_workspaces/`) 
    return users_in_workspaces.data
  }
)
export const postUserToWorkspace = createAsyncThunk(
  'workspaces/postUserToWorkspace',
  async (object) => {
    console.log("post")
    const users_in_workspaces = await axios.post(`/api/users_in_workspaces/?user_id=${object.userId}&room_id=${object.roomId}`) 
    return users_in_workspaces.data
  }
)
export const deleteUserFromWorkspace = createAsyncThunk(
  'workspaces/deleteUserFromWorkspace',
  async (object) => {
    console.log("delete")
    const users_in_workspaces = await axios.delete(`/api/users_in_workspaces/?user_id=${object.userId}&room_id=${object.roomId}`) 
    return users_in_workspaces.data
  }
)


export const workspacesSlice = createSlice({
  name: "workspaces",
  initialState: {all: null, configure: null, selectedFiles: [], selectedUsers: [], users_in_workspaces: null}, 
  reducers: {
    getUsersInWorkspaces: fetchUsersInWorkspaces(),
    getWorkspaces: fetchWorkspaces(),
    setCurrentWorkspace: (state, action) => {
      state.currentWorkspace = action.payload
    },
    changeWorkspaceName: patchWorkspaceName(),
    removeWorkspace: deleteWorkspace(),
    addWorkspace: postWorkspace(),
    setSelectedFiles: (state, action) => {
      state.selectedFiles = action.payload
    },
    addFileToWorkspace: postFileToWorkspace(),
    removeFileFromWorkspace: (state, action) => {
      let index = state.selectedFiles.find((file) => file.id === action.payload.id)
      state.selectedFiles.splice(index, 1)
    },
    addUserToWorkspace: postUserToWorkspace(),
    removeUserFromWorkspace: deleteUserFromWorkspace(),
    resetUsersAndFiles: (state, action) => {
      state.selectedFiles = []
      state.selectedUsers = []
    },
    addToCurrentGroup: (state, action) => {
      let selected = state.all.find((workspace) => workspace.id === action.payload)
      state.currentGroup.push(selected)
    },
    removeFromCurrentGroup: (state, action) => {
      let index = state.currentGroup.findIndex((workspace) => workspace.id === action.payload)
      state.currentGroup.splice(index, 1);
    },
    setCurrentGroup: (state, action) => {
      state.currentGroup = action.payload.map((workspaceId) => state.all.find((workspace) => workspace.id === workspaceId))
    }


  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersInWorkspaces.fulfilled, (state, action) => {
        state.users_in_workspaces = action.payload
      })
      .addCase(fetchWorkspaces.fulfilled, (state, action) => {
        state.all = action.payload;
      })
      .addCase(patchWorkspaceName.fulfilled, (state, action) => {
        state.all = action.payload;
        state.currentGroup = action.payload;
      })
      .addCase(deleteWorkspace.fulfilled, (state, action) => {
        state.all = action.payload;
        state.currentGroup = action.payload;
      })
      .addCase(postWorkspace.fulfilled, (state, action) => {
        console.log(action.payload)
      })
      .addCase(postUserToWorkspace.fulfilled, (state, action) => {
        state.users_in_workspaces = action.payload
      })
      .addCase(deleteUserFromWorkspace.fulfilled, (state, action) => {
        state.users_in_workspaces = action.payload
      })
  }
})

export const { getWorkspaces, setCurrentWorkspace, removeWorkspace, addWorkspace, toggleSelectedFile, setSelectedFiles, addFileToWorkspace, removeFileFromWorkspace, addUserToWorkspace, removeUserFromWorkspace, resetUsersAndFiles } = workspacesSlice.actions;

export const selectCurrentGroup = (state) => state.workspaces.currentGroup;

export default workspacesSlice.reducer;