import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CharacterDetailsPage, FavoritesPage, HomePage } from 'src/pages';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/character/:id" element={<CharacterDetailsPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
    </Routes>
  );
};

export default AppRoutes;
