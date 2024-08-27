import React from 'react';
import Navigation from '../components/Navigation';
import SignInForm from '../components/SignInForm';
import Footer from '../components/Footer';
import '../asset/main.css';

function SignIn() {
  return (
    <div className="App">
      <Navigation />
      <main className="main bg-dark">
        <SignInForm />
      </main>
      <Footer />
    </div>
  );
}

export default SignIn;