import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: 'Jane Doe',
    isLoggedIn: true,
  },
  reducers: {
    setUser(state, action) {
      return { ...state, ...action.payload };
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export const selectUserName = (state) => state.user.name;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;

export default userSlice.reducer;
