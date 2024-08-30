import React from 'react';
import Navigation from '../components/Navigation';
import SignInForm from '../components/SignInForm';
import Footer from '../components/Footer';
import '../asset/main.css';

function SignIn() {
  return (
    <div className="App">
      {/* Composant de navigation en haut de la page */}
      <Navigation />

      {/* Contenu principal de la page */}
      <main className="main bg-dark">
        {/* Formulaire de connexion */}
        <SignInForm />
      </main>
      <Footer />
    </div>
  );
}

export default SignIn;