/* eslint-disable max-len */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getPlanetById, getPlanetImg } from '../../api/planets';

import { Loader } from '../Loader/Loader';

import { Person } from '../../types/Person';
import { Film } from '../../types/Film';
import { Planet } from '../../types/Planet';
import { transformNumber, transformString } from '../../utils/transformString';

import poster from '../../assets/img/poster.jpg';
import characters from '../../assets/img/characters.jfif';

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
        <div className="container mx-auto">
          <section className="text-yellow mb-32 my-24 text-gray-800 text-center md:text-left">
            <div>
              <a
                className="link text-yellow"
                onClick={(event) => {
                  event.preventDefault();
                  // eslint-disable-next-line no-restricted-globals
                  history.back();
                }}
              >
                {'< Back'}
              </a>
            </div>

            <h2 className="text-yellow text-3xl font-bold mb-12 text-center">{currPlanet.name}</h2>

            <div className="flex flex-wrap mb-6">
              <div className="grow-0 shrink-0 basis-auto w-full md:w-3/12 px-3 mb-6 md:mb-0 ml-auto">
                <div
                  className="relative overflow-hidden bg-no-repeat bg-cover relative overflow-hidden bg-no-repeat bg-cover ripple shadow-lg rounded-lg mb-6"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  <img
                    src={getPlanetImg(planetId)}
                    onError={({ currentTarget }) => {
                      // eslint-disable-next-line no-param-reassign
                      currentTarget.onerror = null;
                      // eslint-disable-next-line no-param-reassign
                      currentTarget.src = 'https://starwars-visualguide.com/assets/img/big-placeholder.jpg';
                    }}
                    className="w-full"
                    alt="Louvre"
                  />
                  <div
                    className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0"
                    style={{ backgroundColor: 'rgba(251, 251, 251, 0.2' }}
                  />
                </div>
              </div>

              <div className="grow-0 shrink-0 basis-auto w-full md:w-9/12 xl:w-7/12 px-3 mb-6 md:mb-0 mr-auto">
                <ul className="text-yellow">
                  <li className="text-yellow text-gray-500">
                    {`Diameter: ${transformNumber(currPlanet.diameter)} km`}
                  </li>
                  <li className="text-gray-500 text-yellow">
                    {`Rotation period: ${currPlanet.rotation_period} hours`}
                  </li>
                  <li className="text-yellow text-gray-500">
                    {`Orbital period: ${transformNumber(currPlanet.orbital_period)} days`}
                  </li>
                  <li className="text-yellow text-gray-500">
                    {`Gravity: ${currPlanet.gravity}`}
                  </li>
                  <li className="text-yellow text-gray-500">
                    {`Population: ${transformNumber(currPlanet.population)}`}
                  </li>
                  <li className="text-yellow text-gray-500">
                    {`Terrain: ${transformString(currPlanet.terrain)}`}
                  </li>
                  <li className="text-yellow text-gray-500">
                    {`Surface water: ${currPlanet.surface_water}%`}
                  </li>
                  <li className="text-yellow text-gray-500">
                    {`Climate: ${transformString(currPlanet.climate)}`}
                  </li>
                </ul>
              </div>

              <div className="container mt-10 mx-auto">
                <section className="text-gray-800 text-center">
                  <div className="grid lg:grid-cols-2 gap-6 xl:gap-x-12">
                    <div className="mb-6 lg:mb-0">
                      <div>
                        <div
                          className="relative overflow-hidden bg-no-repeat bg-cover relative overflow-hidden bg-no-repeat bg-cover ripple shadow-lg rounded-lg mb-6"
                          data-mdb-ripple="true"
                          data-mdb-ripple-color="light"
                        >
                          <img
                            src={poster}
                            className="w-full poster"
                            alt="poster"
                          />
                          <div
                            className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0"
                            style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}
                          />
                        </div>

                        <h5 className="text-yellow text-lg font-bold mb-3">Related films</h5>
                        {planetFilms.length > 0
                          ? (
                            <ul>
                              {planetFilms.map((film) => {
                                return (
                                  <li key={film.title} className="text-yellow text-gray-500">{film.title}</li>
                                );
                              })}
                            </ul>
                          ) : (
                            <p className="text-yellow text-gray-500">There are no related items for this category</p>
                          )}
                      </div>
                    </div>

                    <div className="mb-6 lg:mb-0">
                      <div>
                        <div
                          className="relative overflow-hidden bg-no-repeat bg-cover relative overflow-hidden bg-no-repeat bg-cover ripple shadow-lg rounded-lg mb-6"
                          data-mdb-ripple="true"
                          data-mdb-ripple-color="light"
                        >
                          <img
                            src={characters}
                            className="w-full"
                            alt="Louvre"
                          />

                          <div
                            className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0"
                            style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}
                          />
                        </div>

                        <h5 className="text-yellow text-lg font-bold mb-3">Residents</h5>
                        {planetResidents.length > 0
                          ? (
                            <ul>
                              {planetResidents.map((person) => {
                                const id = person.url.split('/').slice(-2)[0];

                                return (
                                  <Link
                                    className="text-yellow text-gray-500 underline link"
                                    to={`/person/${id}`}
                                    key={person.name}
                                  >
                                    {person.name}
                                  </Link>
                                );
                              })}
                            </ul>
                          ) : (
                            <p className="text-yellow text-gray-500">There are no related items for this category</p>
                          )}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};
