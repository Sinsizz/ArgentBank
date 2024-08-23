import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    profile: null,
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.token = null;
      state.profile = null;
    },
    setUserProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { login, logout, setUserProfile } = userSlice.actions;
export default userSlice.reducer;