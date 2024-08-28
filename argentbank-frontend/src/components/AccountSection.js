import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons';

function AccountSection({ title, amount, description }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{title}</h3>
        <p className="account-amount">{amount}</p>
        <p className="account-amount-description">{description}</p>
      </div>
      <div className="account-content-wrapper cta">
      <button className="transaction-icon-button" onClick={toggleOpen}>
  <FontAwesomeIcon icon={isOpen ? faTimes : faChevronRight} />
</button>
      </div>
      {isOpen && (
        <div className="transaction-details">
          {/* Ici, vous pouvez ajouter les détails des transactions */}
          <p>Transaction details will be displayed here</p>
        </div>
      )}
    </section>
  );
}

export default AccountSection;