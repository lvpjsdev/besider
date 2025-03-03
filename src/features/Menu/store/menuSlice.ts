import { RootState } from '../../../app/store';
import { createSlice } from '@reduxjs/toolkit';

export const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    section: 'General',
  },
  reducers: (create) => ({
    changeCurrentSection: create.reducer<string>((state, action) => {
      state.section = action.payload;
    }),
  }),
});

export const { changeCurrentSection } = menuSlice.actions;

export const menuReducer = menuSlice.reducer;

export const selectMenuState = (state: RootState) => state.menu;
