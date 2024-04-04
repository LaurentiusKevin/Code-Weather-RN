import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: {
  value: string;
} = {
  value: 'metric',
};

export const unitSlice = createSlice({
  name: 'unit',
  initialState,
  reducers: {
    setUnit: (state, actions: PayloadAction<string>) => {
      state.value = actions.payload;
    },
  },
});

export const {setUnit} = unitSlice.actions;

export default unitSlice.reducer;
