// src/components/Routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PublicPage } from '../pages/PublicPage';
import About from '../pages/About';
import { HomePage } from '../pages/HomePage';
import { DudaPage } from '../pages/DudaPage';
import { DudasListPage } from '../pages/DudasListPage';

export const TutorRoutes = () => {
  return (
    <Routes>
      <Route path="*" exact element={<DudasListPage/>} />
      <Route path="dudas" element={<DudasListPage/>} />
      <Route path="dudas/:id" element={<DudaPage/>} />
      <Route path=":id" element={<DudaPage/>} />
    </Routes>
  );
};
