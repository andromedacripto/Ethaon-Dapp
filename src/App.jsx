import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import PrivaVotingDApp from './PrivaVotingDApp';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/testnet" element={<PrivaVotingDApp />} />
    </Routes>
  );
}
