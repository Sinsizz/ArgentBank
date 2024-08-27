import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function Header() {
  const { profile } = useSelector(state => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');

  const handleEditName = () => {
    setIsEditing(true);
    setNewName(profile?.firstName || '');
  };

  const handleSaveName = () => {
    // Logique pour sauvegarder le nom
    setIsEditing(false);
  };

  return (
    <div className="header">
      <h1>
        Welcome back<br />
        {isEditing ? (
          <input 
            type="text" 
            value={newName} 
            onChange={(e) => setNewName(e.target.value)}
          />
        ) : (
          `${profile.firstName} ${profile.lastName}!`
        )}
      </h1>
      {isEditing ? (
        <button className="edit-button" onClick={handleSaveName}>Save</button>
      ) : (
        <button className="edit-button" onClick={handleEditName}>Edit Name</button>
      )}
    </div>
  );
}

export default Header;