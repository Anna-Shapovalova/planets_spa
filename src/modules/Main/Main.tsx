/* eslint-disable max-len */
/* eslint-disable no-console */
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Select, Option } from '@material-tailwind/react';

import { Loader } from '../../components/Loader/Loader';
import { Pagination } from '../../components/Pagination/Pagination';

import { Planet } from '../../types/Planet';
import { getPlanets } from '../../api/planets';

export const Main: React.FC = () => {
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [total, setTotal] = useState(0);

  const getDataFromServer = useCallback(async () => {
    try {
      setIsLoading(true);
      const planetsFromServer = await getPlanets();

      setTotal(planetsFromServer.length);
      setPlanets(await planetsFromServer);
    } catch (error) {
      throw new Error(`${error}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getDataFromServer();
  }, []);

  const firstItem = (currentPage - 1) * perPage;
  const lastItem = Math.min((firstItem + perPage), total);

  const currentItems = planets.slice(firstItem, lastItem);

  const handlePerPage = (
    value = '10',
  ) => {
    setPerPage(Number(value));
    setCurrentPage(1);
  };

  const onPageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      {isLoading && <Loader />}
      {planets.length > 0 && (
        <div className="container mx-auto">
          <section className="mx-2.5 text-yellow mb-32 my-24 text-gray-800 text-center md:text-left">
            <h1 className="text-yellow flex flex-col items-center mb-6 uppercase mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Explore the galaxy far, far away
            </h1>
            <div className="text-yellow flex w-72 flex-col gap-4 select">
              <Select
                variant="standard"
                color="yellow"
                label="Select Planets per page"
                value={perPage.toString()}
                onChange={handlePerPage}
                className="text-yellow select"
              >
                <Option className="text-yellow" value="5">5</Option>
                <Option className="text-yellow" value="10">10</Option>
                <Option className="text-yellow" value="15">15</Option>
              </Select>
            </div>

            <ul>
              {currentItems.map(planet => {
                const planetId = planet.url.split('/').slice(-2)[0];

                return (
                  <Link
                    className="underline link"
                    key={planet.name}
                    to={`/planet/${planetId}`}
                  >
                    <li className="list__item">
                      <h3>{planet.name}</h3>
                    </li>
                  </Link>
                );
              })}
            </ul>
            <Pagination
              total={total}
              perPage={perPage}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          </section>
        </div>
      )}
    </div>
  );
};
