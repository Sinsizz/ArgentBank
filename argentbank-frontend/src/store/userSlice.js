import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  userData: null,
  token: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userData = action.payload.userData;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userData = null;
      state.token = null;
    },
    updateUserProfile: (state, action) => {
      state.userData = { ...state.userData, ...action.payload };
    },
  },
});

export const { login, logout, updateUserProfile } = userSlice.actions;

export default userSlice.reducer;