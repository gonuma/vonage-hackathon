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
  async (id) => {
    await axios.delete(`/api/workspaces/${id}`) 
    return id
  }
)

export const postWorkspace = createAsyncThunk(
  'workspaces/postWorkspace',
  async (object) => {
    console.log("post")
    console.log(object)
    const workspaces = await axios.post(`/api/workspaces/?session_id=${object.session.sessionId}&token=${object.session.token}`) 
    const users_in_workspaces = await axios.post(`/api/users_in_workspaces/?user_id=${object.user}&room_id=${workspaces.data.insertedWorkspace.id}`) 
    return {workspaces: workspaces.data, users_in_workspaces: users_in_workspaces.data}
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
  initialState: {all: null, configure: null, users_in_workspaces: null}, 
  reducers: {
    getUsersInWorkspaces: fetchUsersInWorkspaces(),
    getWorkspaces: fetchWorkspaces(),
    setCurrentWorkspace: (state, action) => {
      state.currentWorkspace = action.payload
    },
    changeWorkspaceName: patchWorkspaceName(),
    removeWorkspace: deleteWorkspace(),
    addWorkspace: postWorkspace(),
    addUserToWorkspace: postUserToWorkspace(),
    removeUserFromWorkspace: deleteUserFromWorkspace(),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersInWorkspaces.fulfilled, (state, action) => {
        state.users_in_workspaces = action.payload
      })
      .addCase(fetchWorkspaces.fulfilled, (state, action) => {
        state.all = action.payload;
      })
      .addCase(postUserToWorkspace.fulfilled, (state, action) => {
        state.users_in_workspaces = action.payload
      })
      .addCase(deleteUserFromWorkspace.fulfilled, (state, action) => {
        state.users_in_workspaces = action.payload
      })
  }
})

export const { getWorkspaces, setCurrentWorkspace, removeWorkspace, addWorkspace, toggleSelectedFile, setSelectedFiles, addFileToWorkspace, addUserToWorkspace, removeUserFromWorkspace } = workspacesSlice.actions;

export const selectCurrentGroup = (state) => state.workspaces.currentGroup;

export default workspacesSlice.reducer;