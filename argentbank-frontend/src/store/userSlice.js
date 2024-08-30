import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// État initial du slice utilisateur
const initialState = {
  profile: null,
  token: null,
  status: 'idle',
  error: null,
  username: '',
};

// Thunk asynchrone pour récupérer le profil de l'utilisateur
export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (_, { getState, dispatch }) => {
    const { token } = getState().user;
    // Appel API pour récupérer le profil utilisateur
    const response = await axios.post(
      'http://localhost:3001/api/v1/user/profile',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // Mise à jour du nom d'utilisateur dans le state
    dispatch(setUsername(response.data.body.userName));
    return response.data.body;
  }
);

// Thunk asynchrone pour mettre à jour le profil de l'utilisateur
export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (userData, { getState }) => {
    const { token } = getState().user;
    // Appel API pour mettre à jour le profil utilisateur
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

// Création du slice utilisateur
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Action pour définir le token
    setToken: (state, action) => {
      state.token = action.payload;
    },
    // Action pour définir le nom d'utilisateur
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    // Action pour déconnecter l'utilisateur
    logout: (state) => {
      state.token = null;
      state.profile = null;
      state.username = '';
      state.status = 'idle';
      state.error = null;
    },
  },
  // Gestion des actions asynchrones
  extraReducers: (builder) => {
    builder
      // Gestion des états de fetchUserProfile
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
      // Gestion de la mise à jour réussie du profil
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.username = action.payload.userName;
      });
  },
});

// Export des actions
export const { setToken, setUsername, logout } = userSlice.actions;

// Export du reducer
export default userSlice.reducer;