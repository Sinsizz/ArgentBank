import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../store/userActions';
import { logout } from '../store/userSlice';
import logo from '../asset/img/argentBankLogo.png'; 

function User() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile, token } = useSelector(state => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    if (!token) {
      navigate('/sign-in');
    } else if (!profile) {
      dispatch(fetchUserProfile());
    }
  }, [token, profile, dispatch, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleEditName = () => {
    setIsEditing(true);
    setNewName(profile?.firstName || '');
  };

  const handleSaveName = () => {
    // Ici, vous devriez appeler une action pour mettre à jour le nom sur le serveur
    // Pour l'instant, nous allons juste fermer le mode d'édition
    setIsEditing(false);
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src={logo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          <Link className="main-nav-item" to="/profile">
            <i className="fa fa-user-circle"></i>
            {profile.firstName}
          </Link>
          <button className="main-nav-item" onClick={handleLogout}>
            <i className="fa fa-sign-out"></i>
            Sign Out
          </button>
        </div>
      </nav>
      <main className="main bg-dark">
        <div className="header">
          <h1>Welcome back<br />{isEditing ? (
            <input 
              type="text" 
              value={newName} 
              onChange={(e) => setNewName(e.target.value)}
            />
          ) : (
            `${profile.firstName} ${profile.lastName}!`
          )}</h1>
          {isEditing ? (
            <button className="edit-button" onClick={handleSaveName}>Save</button>
          ) : (
            <button className="edit-button" onClick={handleEditName}>Edit Name</button>
          )}
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  );
}

export default User;