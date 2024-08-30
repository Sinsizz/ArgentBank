import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from '../components/Navigation';
import AccountSection from '../components/AccountSection';
import Footer from '../components/Footer';
import EditUserForm from '../components/EditUserForm';
import { fetchUserProfile } from '../store/userSlice';

function User() {
  // Hooks Redux pour dispatcher des actions et accéder au state
  const dispatch = useDispatch();
  const { profile, token, status, error } = useSelector(state => state.user);
  
  // State local pour gérer l'affichage du formulaire d'édition
  const [showEditForm, setShowEditForm] = useState(false);

  // Effet pour charger le profil utilisateur si nécessaire
  useEffect(() => {
    if (token && !profile) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, token, profile]);

  // Gestion des états de chargement et d'erreur
  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;
  if (!profile) return <div>No profile data available</div>;

  return (
    <div className="App">
      <Navigation />
      <main className="main bg-dark">
        <div className="header">
          {showEditForm ? (
            // Affichage du formulaire d'édition si showEditForm est true
            <EditUserForm onClose={() => setShowEditForm(false)} />
          ) : (
            // Affichage du message de bienvenue et du bouton d'édition
            <>
              <h1>Welcome back<br />{profile.firstName} {profile.lastName}!</h1>
              <button className="edit-button" onClick={() => setShowEditForm(true)}>Edit Name</button>
            </>
          )}
        </div>
        <h2 className="sr-only">Accounts</h2>
        {/* Composants AccountSection pour afficher les informations des comptes */}
        <AccountSection 
          title="Argent Bank Checking (x8349)"
          amount="$2,082.79"
          description="Available Balance"
        />
        <AccountSection 
          title="Argent Bank Savings (x6712)"
          amount="$10,928.42"
          description="Available Balance"
        />
        <AccountSection 
          title="Argent Bank Credit Card (x8349)"
          amount="$184.30"
          description="Current Balance"
        />
      </main>
      <Footer />
    </div>
  );
}

export default User;