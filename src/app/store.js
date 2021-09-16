import { configureStore } from '@reduxjs/toolkit';
import filesReducer from '../slices/filesSlice'
import userReducer from '../slices/userSlice'

export const store = configureStore({
  reducer: {
    files: filesReducer,
    user: userReducer,
  },
});
