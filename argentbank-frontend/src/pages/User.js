import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../store/userActions';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import AccountSection from '../components/AccountSection';
import Footer from '../components/Footer';

function User() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile, token } = useSelector(state => state.user);

  useEffect(() => {
    if (!token) {
      navigate('/sign-in');
    } else if (!profile) {
      dispatch(fetchUserProfile());
    }
  }, [token, profile, dispatch, navigate]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Navigation />
      <main className="main bg-dark">
        <Header />
        <h2 className="sr-only">Accounts</h2>
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