import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../store/userSlice';

function EditUserForm({ onClose }) {
  // Hook Redux pour dispatcher des actions
  const dispatch = useDispatch();
  
  // Récupération du profil utilisateur depuis le state Redux
  const { profile } = useSelector((state) => state.user);
  
  // State local pour le nom d'utilisateur modifiable
  const [userName, setUserName] = useState(profile?.userName || '');

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Dispatch de l'action pour mettre à jour le profil
      await dispatch(updateUserProfile({ userName })).unwrap();
      // Fermeture du formulaire après mise à jour réussie
      onClose();
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-user-form">
      <h2>Edit User Info</h2>
      
      {/* Champ pour modifier le nom d'utilisateur */}
      <div className="input-wrapper">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      
      {/* Champ prénom (non modifiable) */}
      <div className="input-wrapper">
        <label htmlFor="firstName">First name:</label>
        <input
          type="text"
          id="firstName"
          value={profile?.firstName || ''}
          disabled
        />
      </div>
      
      {/* Champ nom de famille (non modifiable) */}
      <div className="input-wrapper">
        <label htmlFor="lastName">Last name:</label>
        <input
          type="text"
          id="lastName"
          value={profile?.lastName || ''}
          disabled
        />
      </div>
      
      {/* Boutons de sauvegarde et d'annulation */}
      <div className="button-wrapper">
        <button type="submit" className="edit-button">Save</button>
        <button type="button" onClick={onClose} className="edit-button">Cancel</button>
      </div>
    </form>
  );
}

export default EditUserForm;