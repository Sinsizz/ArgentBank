import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../store/userSlice';

function EditUserForm({ onClose }) {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);
  const [userName, setUserName] = useState(profile?.userName || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateUserProfile({ userName })).unwrap();
      onClose();
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-user-form">
      <h2>Edit User Info</h2>
      <div className="input-wrapper">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="firstName">First name:</label>
        <input
          type="text"
          id="firstName"
          value={profile?.firstName || ''}
          disabled
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="lastName">Last name:</label>
        <input
          type="text"
          id="lastName"
          value={profile?.lastName || ''}
          disabled
        />
      </div>
      <div className="button-wrapper">
        <button type="submit" className="edit-button">Save</button>
        <button type="button" onClick={onClose} className="edit-button">Cancel</button>
      </div>
    </form>
  );
}

export default EditUserForm;