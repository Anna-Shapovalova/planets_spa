/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getPlanetById } from '../../api/planets';

import { Loader } from '../Loader/Loader';

import { Person } from '../../types/Person';
import { Film } from '../../types/Film';
import { Planet } from '../../types/Planet';
import { transformNumber, transformString } from '../../utils/transformString';

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
    } catch (error) {
      throw new Error(`${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPlanet();
  }, [planetId]);

  const planetFilms = films
    .filter(film => currPlanet?.films.find(movie => movie === film.url));

  const planetResidents = people
    .filter(person => currPlanet?.residents
      .find(resident => resident === person.url));

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

          <div>
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
            <ul>
              <li>
                {`Diameter: ${transformNumber(currPlanet.diameter)} km`}
              </li>
              <li>
                {`Rotation period: ${currPlanet.rotation_period} hours`}
              </li>
              <li>
                {`Orbital period: ${transformNumber(currPlanet.orbital_period)} days`}
              </li>
              <li>
                {`Gravity: ${currPlanet.gravity}`}
              </li>
              <li>
                {`Population: ${transformNumber(currPlanet.population)}`}
              </li>
              <li>
                {`Terrain: ${transformString(currPlanet.terrain)}`}
              </li>
              <li>
                {`Surface water: ${currPlanet.surface_water}%`}
              </li>
              <li>
                {`Climate: ${transformString(currPlanet.climate)}`}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="
            text-3xl
            font-medium
            leading-tight
            text-gray-800
            mb-2.5"
            >
              Related films
            </h3>

            {planetFilms.length > 0
              ? (
                <ul>
                  {planetFilms.map((film) => {
                    return (
                      <li key={film.title}>{film.title}</li>
                    );
                  })}
                </ul>
              ) : (
                <p>There are no related items for this category</p>
              )}
          </div>

          <div>
            <h3 className="
            text-3xl
            font-medium
            leading-tight
            text-gray-800
            mb-2.5"
            >
              Residents
            </h3>

            {planetResidents.length > 0
              ? (
                <ul>
                  {planetResidents.map((person) => {
                    const id = person.url.split('/').slice(-2)[0];

                    return (
                      <Link
                        to={`/person/${id}`}
                        key={person.name}
                      >
                        {person.name}
                      </Link>
                    );
                  })}
                </ul>
              ) : (
                <p>There are no related items for this category</p>
              )}
          </div>
        </>
      )}
    </>
  );
};
