import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../store/userSlice';

function SignInForm() {
  // États locaux pour gérer les entrées du formulaire
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(''); // Nouvel état pour le message d'erreur

  // Hooks Redux et React Router
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fonction de gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Réinitialiser le message d'erreur à chaque tentative
    try {
      // Appel API pour la connexion
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        console.log('Login successful, received data:', data);
        
        const token = data.body.token;
        if (!token) {
          throw new Error('Token not found in response');
        }
        
        // Stockage du token dans Redux
        dispatch(setToken(token));
        
        // Stockage du token dans localStorage si "Remember me" est coché
        if (rememberMe) {
          localStorage.setItem('token', token);
        }
        
        // Redirection vers la page utilisateur
        navigate('/user');
      } else {
        // Gestion des erreurs de connexion
        console.error('Login failed:', data);
        setError(data.message || 'Email ou mot de passe invalide. Veuillez réessayer.');
      }
    } catch (error) {
      // Gestion des erreurs générales
      console.error('Erreur lors de la connexion:', error);
      setError('Une erreur est survenue. Veuillez réessayer plus tard.');
    }
  };

  // Rendu du formulaire
  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
      {error && <div className="error-message">{error}</div>} {/* Affichage du message d'erreur */}
      <form onSubmit={handleSubmit}>
        {/* Champ email */}
        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {/* Champ mot de passe */}
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* Case à cocher "Remember me" */}
        <div className="input-remember">
          <input 
            type="checkbox" 
            id="remember-me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        {/* Bouton de soumission */}
        <button type="submit" className="sign-in-button">Sign In</button>
      </form>
    </section>
  );
}

export default SignInForm;