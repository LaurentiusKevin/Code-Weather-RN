import {configureStore} from '@reduxjs/toolkit';
import unitSlice from './UnitSlice';

export const store = configureStore({
  reducer: {
    unit: unitSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
