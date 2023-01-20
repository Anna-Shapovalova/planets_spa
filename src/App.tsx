import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Header } from './components/Header';
import { Main } from './modules/Main';
import { PlanetPage } from './modules/PlanetPage';
import { PersonPage } from './modules/PersonPage';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="page min-h-screen">
      <Header />

      <main className="page__section">
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/">
            <Route index element={<Main />} />
            <Route path="/planet/:name" element={<PlanetPage />} />
          </Route>
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/person/:id" element={<PersonPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};
