import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    theme: 'light',
    notification: null,
  },
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    },
    showNotification(state, action) {
      state.notification = action.payload;
    },
    clearNotification(state) {
      state.notification = null;
    },
  },
});

export const { setTheme, showNotification, clearNotification } = uiSlice.actions;

export const selectTheme = (state) => state.ui.theme;
export const selectNotification = (state) => state.ui.notification;

export default uiSlice.reducer;
