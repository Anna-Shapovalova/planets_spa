/* eslint-disable max-len */
/* eslint-disable no-console */
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Loader } from '../../components/Loader/Loader';
import { Pagination } from '../../components/Pagination/Pagination';

import { Planet } from '../../types/Planet';

interface Props {
  total: number,
  planets: Planet[],
  isLoading: boolean,
}

export const Main: React.FC<Props> = ({
  total,
  planets,
  isLoading,
}) => {
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const firstItem = (currentPage - 1) * perPage;
  const lastItem = Math.min((firstItem + perPage), total);

  const currentItems = planets.slice(firstItem, lastItem);

  const handlePerPage = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPerPage(Number(event.target.value));
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
          <section className="text-yellow mb-32 my-24 text-gray-800 text-center md:text-left">
            <div className="select relative inline-flex items-center cursor-pointer">
              <label htmlFor="perPageSelector" className="text-yellow block mb-2 mr-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
              <select
                id="perPageSelector"
                className="text-yellow bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-yellow-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-500 dark:focus:border-yellow-500"
                style={{ backgroundColor: 'transparent' }}
                value={perPage}
                onChange={handlePerPage}
              >
                <option
                  value={5}
                  style={{ backgroundColor: 'transparent' }}
                  className="text-yellow"
                >
                  5
                </option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </div>
            <ul>
              {currentItems.map(planet => {
                const planetId = planet.url.split('/').slice(-2)[0];

                return (
                  <Link
                    className="underline link"
                    key={planet.name}
                    to={`${planetId}`}
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
