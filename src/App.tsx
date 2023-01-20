import React, { useCallback, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getPeople, getPlanets, getResourse } from './api/planets';

import { Main } from './modules/Main';
import { PlanetPage } from './modules/PlanetPage';
import { PersonPage } from './modules/PersonPage';
import { Header } from './components/Header';
import { Film } from './types/Film';
import { Person } from './types/Person';
import { Planet } from './types/Planet';
import { Footer } from './components/Footer';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [films, setFilms] = useState<Film[]>([]);
  const [people, setPeople] = useState<Person[]>([]);
  const [total, setTotal] = useState(0);

  const getDataFromServer = useCallback(async () => {
    try {
      setIsLoading(true);
      const planetsFromServer = await getPlanets();
      const filmsFromServer = await getResourse('/films/');
      const peopleFromServer = await getPeople();

      setTotal(planetsFromServer.length);
      setPlanets(await planetsFromServer);
      setFilms(await filmsFromServer.results);
      setPeople(await peopleFromServer);
    } catch (error) {
      throw new Error(`${error}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getDataFromServer();
  }, []);

  return (
    <div className="page min-h-screen">
      <Header />

      <main className="page__section">
        <Routes>
          <Route path="*" element={<NotFoundPage />} />

          <Route
            path="/"
            element={(
              <Main
                total={total}
                planets={planets}
                isLoading={isLoading}
              />
            )}
          />

          <Route path="/home" element={<Navigate to="/" replace />} />

          <Route path="/">
            <Route
              index
              element={(
                <Main
                  total={total}
                  planets={planets}
                  isLoading={isLoading}
                />
              )}
            />

            <Route
              path="/planet/:name"
              element={(
                <PlanetPage
                  people={people}
                  films={films}
                />
              )}
            />
          </Route>

          <Route
            path="/person/:id"
            element={(
              <PersonPage
                planets={planets}
              />
            )}
          />

        </Routes>
      </main>

      <Footer />
    </div>
  );
};
