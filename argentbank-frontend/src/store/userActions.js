import { createAsyncThunk } from '@reduxjs/toolkit';

// Création d'un thunk asynchrone pour récupérer le profil de l'utilisateur
export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile', // Nom de l'action
  async (_, { getState, rejectWithValue }) => {
    try {
      // Récupération du token depuis le state Redux
      const { token } = getState().user;

      // Appel API pour récupérer le profil utilisateur
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Utilisation du token pour l'authentification
        },
      });

      // Vérification de la réponse
      if (response.ok) {
        // Si la réponse est OK, on parse le JSON et on retourne le body
        const data = await response.json();
        return data.body;
      } else {
        // Si la réponse n'est pas OK, on parse l'erreur et on la rejette
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to fetch user profile');
      }
    } catch (error) {
      // En cas d'erreur lors de l'appel API, on rejette avec un message d'erreur
      return rejectWithValue('Error fetching user profile: ' + error.message);
    }
  }
);