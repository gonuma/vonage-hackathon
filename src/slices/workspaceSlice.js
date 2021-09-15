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



export const workspaceSlice = createSlice({
  name: "workspace",
  initialState: {all: null}, 
  reducers: {
    getWorkspaces: fetchWorkspaces()

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkspaces.fulfilled, (state, action) => {
        state.all = action.payload
      })
  }
})

export const { getWorkspaces } = workspaceSlice.actions;


export default workspaceSlice.reducer;