// src/components/Routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PublicPage } from '../pages/PublicPage';
import { About } from '../pages/About';

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="*" exact element={<PublicPage/>} />
      <Route path="about" element={<About/>} />
    </Routes>
  );
};
