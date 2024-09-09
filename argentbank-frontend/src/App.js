import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './asset/main.css';

// Utilisation du chargement paresseux (lazy loading) pour les composants de page
const Home = lazy(() => import('./pages/Home.js'));
const SignIn = lazy(() => import('./pages/SignIn.js'));
const User = lazy(() => import('./pages/User.js'));

// Composant de chargement léger
const Loading = () => <div>Loading...</div>;

function AppRouter() {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default AppRouter;