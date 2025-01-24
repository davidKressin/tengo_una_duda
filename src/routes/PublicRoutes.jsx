// src/components/Routes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PublicPage } from '../pages/PublicPage';
import About from '../pages/About';
import { HomePage } from '../pages/HomePage';
import { DudaPage } from '../pages/DudaPage';
import { DudasListPage } from '../pages/DudasListPage';
import { LoginTutorPage } from '../pages/LoginTutorPage';

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="*" exact element={<HomePage/>} />
      <Route path="publish" element={<PublicPage/>} />
      <Route path="about" element={<About/>} />
      <Route path="dudas/*" element={<LoginTutorPage/>} />
      {/* <Route path="duda/:id" element={<DudaPage/>} /> */}
    </Routes>
  );
};
