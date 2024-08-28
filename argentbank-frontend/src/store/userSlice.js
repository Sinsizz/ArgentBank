import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  profile: null,
  token: null,
  status: 'idle',
  error: null,
  username: '',
};

export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (_, { getState, dispatch }) => {
    const { token } = getState().user;
    const response = await axios.post(
      'http://localhost:3001/api/v1/user/profile',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(setUsername(response.data.body.userName));
    return response.data.body;
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (userData, { getState }) => {
    const { token } = getState().user;
    const response = await axios.put(
      'http://localhost:3001/api/v1/user/profile',
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.body;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.profile = null;
      state.username = '';
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.username = action.payload.userName;
      });
  },
});

export const { setToken, setUsername, logout } = userSlice.actions;

export default userSlice.reducer;