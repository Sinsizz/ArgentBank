import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff, faGear } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import EditUserForm from './EditUserForm';
import logo from '../asset/img/argentBankLogo.png';

function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { profile, token, username } = useSelector(state => state.user);
  const [showEditForm, setShowEditForm] = useState(false);

  const handleAuth = () => {
    if (token) {
      dispatch(logout());
      navigate('/');
    } else {
      navigate('/sign-in');
    }
  };

  return (
    <nav className={`main-nav ${isHomePage ? '' : 'main-nav-with-margin'}`}>
      <div className={`main-nav-content ${isHomePage ? '' : 'container'}`}>
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src={logo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        
        <div className="main-nav-items">
          {token && (
            <>
              <div className="user-info-container">
                <button className="main-nav-item user-info" onClick={() => setShowEditForm(true)}>
                  <span className="user-name">{username || profile?.firstName}</span>
                  <div className="user-icon-wrapper">
                    <FontAwesomeIcon icon={faUser} className="nav-icon user-icon" />
                  </div>
                </button>
                {showEditForm && (
                  <div className="edit-form-popup">
                    <EditUserForm onClose={() => setShowEditForm(false)} />
                  </div>
                )}
              </div>
              <Link className="main-nav-item" to="/settings">
                <FontAwesomeIcon icon={faGear} className="nav-icon" />
                <span className="sr-only">Settings</span>
              </Link>
              <button className="main-nav-item power-button" onClick={handleAuth}>
                <FontAwesomeIcon icon={faPowerOff} className="nav-icon" />
                <span className="sr-only">Sign Out</span>
              </button>
            </>
          )}
          {!token && (
            <button className="main-nav-item power-button" onClick={handleAuth}>
              <FontAwesomeIcon icon={faPowerOff} className="nav-icon" />
              <span className="sr-only">Sign In</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;