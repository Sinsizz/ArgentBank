import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Footer from '../components/Footer';

function Home() {
  return (
    <div className="App">
      <Navigation />
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
