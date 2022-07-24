import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../features/counter/appSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});
