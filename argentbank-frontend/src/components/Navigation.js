import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff, faUserCircle, faGear } from '@fortawesome/free-solid-svg-icons';
import logo from '../asset/img/argentBankLogo.png';

function Navigation() {
  // Hooks React Router et Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Vérifie si on est sur la page d'accueil
  const isHomePage = location.pathname === '/';
  
  // Récupère les informations utilisateur du state Redux
  const { profile, token, username } = useSelector(state => state.user);

  // Gère la connexion/déconnexion
  const handleAuth = () => {
    if (token) {
      dispatch(logout());
      navigate('/');
    } else {
      navigate('/sign-in');
    }
  };

  // Détermine le nom à afficher (username ou prénom)
  const displayName = username || (profile && profile.firstName) || '';

  return (
    <nav className={`main-nav ${isHomePage ? '' : 'main-nav-with-margin'}`}>
      <div className={`main-nav-content ${isHomePage ? '' : 'container'}`}>
        {/* Logo et lien vers la page d'accueil */}
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src={logo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        
        <div className="main-nav-items">
          {/* Affichage conditionnel basé sur l'état de connexion */}
          {token ? (
            <>
              {/* Informations utilisateur et lien vers le profil */}
              <div className="user-info-container">
                <Link to="/user" className="main-nav-item user-info">
                  <span className="user-name">{displayName}</span>
                  <div className="user-icon-wrapper">
                    <FontAwesomeIcon icon={faUserCircle} className="nav-icon user-icon" />
                  </div>
                </Link>
              </div>
              {/* Lien vers les paramètres */}
              <Link className="main-nav-item" to="/settings">
                <FontAwesomeIcon icon={faGear} className="nav-icon" />
                <span className="sr-only">Settings</span>
              </Link>
              {/* Bouton de déconnexion */}
              <button className="main-nav-item power-button" onClick={handleAuth}>
                <FontAwesomeIcon icon={faPowerOff} className="nav-icon" />
                <span className="sr-only">Sign Out</span>
              </button>
            </>
          ) : (
            // Affichage conditionnel pour les utilisateurs non connectés
            isHomePage ? (
              // Lien "Sign In" sur la page d'accueil
              <Link to="/sign-in" className="main-nav-item">
                Sign In
              </Link>
            ) : (
              // Bouton de connexion avec icône sur les autres pages
              <button className="main-nav-item power-button" onClick={handleAuth}>
                <FontAwesomeIcon icon={faUserCircle} className="nav-icon" />
                <span className="sr-only">Sign In</span>
              </button>
            )
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;