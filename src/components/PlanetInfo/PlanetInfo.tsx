/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-console */
import { useEffect, useState } from 'react';

import { getPlanetById } from '../../api/planets';

import { Loader } from '../Loader/Loader';

import { Person } from '../../types/Person';
import { Film } from '../../types/Film';
import { Planet } from '../../types/Planet';

interface Props {
  planetId: string;
  people: Person[],
  films: Film[],
}

export const PlanetInfo: React.FC<Props> = ({
  planetId,
  people,
  films,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currPlanet, setCurrPlanet] = useState<Planet>();

  const loadPlanet = async () => {
    try {
      setIsLoading(true);
      const planet = await getPlanetById(planetId);

      setCurrPlanet(await planet);
      console.log(planet);
    } catch (error) {
      throw new Error(`${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPlanet();
    console.log('planet', currPlanet);
  }, [planetId]);

  console.log(currPlanet?.films);
  console.log(films);

  const planetFilms = films
    .filter(film => currPlanet?.films.find(movie => movie === film.url));

  const planetResidents = people
    .filter(person => currPlanet?.residents
      .find(resident => resident === person.url));

  console.log(planetResidents);

  return (
    <>
      {isLoading && <Loader />}

      {currPlanet && (
        <>
          <div>
            <a
              onClick={(event) => {
                event.preventDefault();
                // eslint-disable-next-line no-restricted-globals
                history.back();
              }}
            >
              {'< Back'}
            </a>
          </div>

          <h1 className="
            text-5xl
            font-medium
            leading-tight
            text-gray-800
            mb-2.5
            mt-0"
          >
            {currPlanet.name}
          </h1>

          <h3 className="
            text-3xl
            font-medium
            leading-tight
            text-gray-800
            mb-2.5"
          >
            Films
          </h3>

          <ul>
            {planetFilms.map((film) => {
              return (
                <li key={film.title}>{film.title}</li>
              );
            })}
          </ul>

          <h3 className="
            text-3xl
            font-medium
            leading-tight
            text-gray-800
            mb-2.5"
          >
            Residents
          </h3>

          <ul>
            {planetResidents.map((person) => {
              return (
                <li key={person.name}>{person.name}</li>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
};
