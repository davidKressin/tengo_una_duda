// src/components/Routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PublicPage } from '../pages/PublicPage';
import About from '../pages/About';
import { HomePage } from '../pages/HomePage';
import { DudaPage } from '../pages/DudaPage';
import { DudasListPage } from '../pages/DudasListPage';

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="*" exact element={<HomePage/>} />
      <Route path="publish" element={<PublicPage/>} />
      <Route path="about" element={<About/>} />
      <Route path="dudas" element={<DudasListPage/>} />
      <Route path="duda/:id" element={<DudaPage/>} />
    </Routes>
  );
};
