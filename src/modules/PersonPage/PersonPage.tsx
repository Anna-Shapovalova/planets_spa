/* eslint-disable max-len */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPersonById, getPersonImg } from '../../api/planets';
import { Loader } from '../../components/Loader';

import { Person } from '../../types/Person';
import { Planet } from '../../types/Planet';
import { transformString } from '../../utils/transformString';

interface Props {
  planets: Planet[],
}

export const PersonPage: React.FC<Props> = ({ planets }) => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [currPerson, setCurrPerson] = useState<Person>();

  const loadPersonData = async () => {
    try {
      setIsLoading(true);
      const person = await getPersonById(id);

      setCurrPerson(await person);

      const home = await currPerson?.homeworld.split('/');

      console.log(await currPerson?.homeworld);
      console.log(home);
    } catch (error) {
      throw new Error(`${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPersonData();
  }, [id]);

  const homePlanet = planets
    .find(planet => planet.url === currPerson?.homeworld);

  return (
    <div className="container mx-auto">
      <section className="text-yellow mb-32 my-24 text-gray-800 text-center md:text-left">
        {isLoading && <Loader />}

        {currPerson && (
          <>
            <div className="container mx-auto">
              <section className="mb-32 my-24 text-gray-800 text-center md:text-left">
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

                <h2 className="text-yellow text-3xl font-bold mb-12 text-center">{currPerson.name}</h2>

                <div className="flex flex-wrap mb-6">
                  <div className="grow-0 shrink-0 basis-auto w-full md:w-3/12 px-3 mb-6 md:mb-0 ml-auto">
                    <div
                      className="relative overflow-hidden bg-no-repeat bg-cover relative overflow-hidden bg-no-repeat bg-cover ripple shadow-lg rounded-lg mb-6"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                    >
                      <img
                        src={getPersonImg(id)}
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
                        {`Birth year: ${currPerson.birth_year}`}
                      </li>
                      <li className="text-yellow text-gray-500">
                        {`Eye color: ${transformString(currPerson.eye_color)}`}
                      </li>
                      <li className="text-yellow text-gray-500">
                        {`Gender: ${transformString(currPerson.gender)}`}
                      </li>
                      <li className="text-yellow text-gray-500">
                        {`Hair color: ${transformString(currPerson.hair_color)}`}
                      </li>
                      <li className="text-yellow text-gray-500">
                        {`Height: ${currPerson.height}cm`}
                      </li>
                      <li className="text-yellow text-gray-500">
                        {`Mass: ${currPerson.mass}kg`}
                      </li>
                      <li className="text-yellow text-gray-500">
                        {`Skin color: ${transformString(currPerson.skin_color)}`}
                      </li>
                      <li className="text-yellow text-gray-500">
                        {'Homeworld: '}
                        <a
                          className="text-yellow text-gray-500 underline cursor-pointer"
                          onClick={(event) => {
                            event.preventDefault();
                            // eslint-disable-next-line no-restricted-globals
                            history.back();
                          }}
                        >
                          {homePlanet?.name}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          </>
        )}
      </section>
    </div>
  );
};
