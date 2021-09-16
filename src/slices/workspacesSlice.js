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
  async (object) => {
    console.log("post")
    const response = await axios.post(`/api/workspaces/`) 
    return response.data
  }
)

export const workspacesSlice = createSlice({
  name: "workspaces",
  initialState: {all: null, configure: null, selectedFiles: null, active: null}, 
  reducers: {
    getWorkspaces: fetchWorkspaces(),
    setCurrentWorkspace: (state, action) => {
      state.currentWorkspace = action.payload
    },
    changeWorkspaceName: patchWorkspaceName(),
    removeWorkspace: deleteWorkspace(),
    addWorkspace: postWorkspace(),
    // addToCurrentGroup: (state, action) => {
    //   let selected = state.all.find((workspace) => workspace.id === action.payload)
    //   state.currentGroup.push(selected)
    // },
    // removeFromCurrentGroup: (state, action) => {
    //   let index = state.currentGroup.findIndex((workspace) => workspace.id === action.payload)
    //   state.currentGroup.splice(index, 1);
    // },
    setCurrentGroup: (state, action) => {
      state.currentGroup = action.payload.map((workspaceId) => state.all.find((workspace) => workspace.id === workspaceId))
    }


  },
  extraReducers: (builder) => {
    builder
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
  }
})

export const { getWorkspaces, setCurrentWorkspace, removeWorkspace, addWorkspace } = workspacesSlice.actions;

export const selectCurrentGroup = (state) => state.workspaces.currentGroup;

export default workspacesSlice.reducer;