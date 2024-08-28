import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().user;
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      

      if (response.ok) {
        const data = await response.json();
        return data.body;
      } else {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to fetch user profile');
      }
    } catch (error) {
      return rejectWithValue('Error fetching user profile: ' + error.message);
    }
  }
);