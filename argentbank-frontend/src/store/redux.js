import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

// Configuration du store Redux
export const store = configureStore({
  reducer: {
    // Définition des reducers de l'application
    user: userReducer, // Le reducer 'user' est associé à la clé 'user' dans le state global
  },
});