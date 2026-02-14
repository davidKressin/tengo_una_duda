// src/components/Routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PublicPage } from '../pages/PublicPage';
import About from '../pages/About';
import { HomePage } from '../pages/HomePage';
import { DudaPage } from '../pages/DudaPage';
import { DudasListPage } from '../pages/DudasListPage';
import { LoginTutorPage } from '../pages/LoginTutorPage';

import { StudentLoginPage } from '../pages/StudentLoginPage';
import { StudentProfilePage } from '../pages/StudentProfilePage';
import { MyDoubtsPage } from '../pages/MyDoubtsPage';
import { StudentOnboardingPage } from '../pages/StudentOnboardingPage';
import { MyPlanPage } from '../pages/MyPlanPage';
import { UploadExamsPage } from '../pages/UploadExamsPage';
import { StudySessionPage } from '../pages/StudySessionPage';
import { DiagnosticTestPage } from '../pages/DiagnosticTestPage';
import { AuthGuard } from '../components/AuthGuard';

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/publish" element={<PublicPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/dudas/*" element={<LoginTutorPage />} />
      <Route path="/login-student" element={<StudentLoginPage />} />

      {/* Rutas Protegidas */}
      <Route path="/profile" element={
        <AuthGuard>
          <StudentProfilePage />
        </AuthGuard>
      } />
      <Route path="/my-doubts" element={
        <AuthGuard>
          <MyDoubtsPage />
        </AuthGuard>
      } />
      <Route path="/onboarding" element={
        <AuthGuard>
          <StudentOnboardingPage />
        </AuthGuard>
      } />
      <Route path="/my-plan" element={
        <AuthGuard>
          <MyPlanPage />
        </AuthGuard>
      } />
      <Route path="/diagnostic/:testId" element={
        <AuthGuard>
          <DiagnosticTestPage />
        </AuthGuard>
      } />
      <Route path="/upload-exams" element={
        <AuthGuard>
          <UploadExamsPage />
        </AuthGuard>
      } />
      <Route path="/study-session/:id" element={
        <AuthGuard>
          <StudySessionPage />
        </AuthGuard>
      } />

      <Route path="*" element={<HomePage />} />
    </Routes>
  );
};
