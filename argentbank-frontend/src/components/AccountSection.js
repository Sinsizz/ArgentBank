import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons';

function AccountSection({ title, amount, description }) {
  // State local pour gérer l'ouverture/fermeture des détails de transaction
  const [isOpen, setIsOpen] = useState(false);

  // Fonction pour basculer l'état ouvert/fermé
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="account-container">
      {/* Section principale du compte */}
      <section className="account">
        {/* Informations du compte */}
        <div className="account-content-wrapper">
          <h3 className="account-title">{title}</h3>
          <p className="account-amount">{amount}</p>
          <p className="account-amount-description">{description}</p>
        </div>
        {/* Bouton pour ouvrir/fermer les détails de transaction */}
        <div className="account-content-wrapper cta">
          <button className="transaction-icon-button" onClick={toggleOpen}>
            <FontAwesomeIcon 
              icon={isOpen ? faTimes : faChevronRight} 
              className={`transaction-arrow ${isOpen ? 'open' : ''}`} 
            />
          </button>
        </div>
      </section>

      {/* Section des détails de transaction (conditionnellement rendue) */}
      <div className={`transaction-details-wrapper ${isOpen ? 'open' : ''}`}>
        <div className="transaction-details">
          <p>Transaction details will be displayed here</p>
        </div>
      </div>
    </div>
  );
}

export default AccountSection;