/* eslint-disable max-len */
/* eslint-disable no-console */
import { useState } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Select, Option } from '@material-tailwind/react';

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
          <section className="text-yellow mb-32 my-24 text-gray-800 text-center md:text-left">
            <div className="text-yellow flex w-72 flex-col gap-4 select">
              <Select
                variant="standard"
                color="yellow"
                label="Select Version"
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
