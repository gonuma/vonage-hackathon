import { configureStore } from '@reduxjs/toolkit';
import filesReducer from '../slices/filesSlice'
import userReducer from '../slices/userSlice'
import workspacesReducer from '../slices/workspacesSlice'

export const store = configureStore({
  reducer: {
    files: filesReducer,
    user: userReducer,
    workspaces: workspacesReducer
  },
});
