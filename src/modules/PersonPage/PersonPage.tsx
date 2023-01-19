/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPersonById } from '../../api/planets';
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
  // const [planet, setPlanet] = useState();

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

  // const planetId = currPerson?.homeworld.split('/').slice(-2)[0];

  return (
    <>
      {isLoading && <Loader />}

      {currPerson && (
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
              {currPerson.name}
            </h1>

            <ul>
              <li>
                {`Birth year: ${currPerson.birth_year}`}
              </li>
              <li>
                {`Eye color: ${transformString(currPerson.eye_color)}`}
              </li>
              <li>
                {`Gender: ${transformString(currPerson.gender)}`}
              </li>
              <li>
                {`Hair color: ${transformString(currPerson.hair_color)}`}
              </li>
              <li>
                {`Height: ${currPerson.height}cm`}
              </li>
              <li>
                {`Mass: ${currPerson.mass}kg`}
              </li>
              <li>
                {`Skin color: ${transformString(currPerson.skin_color)}`}
              </li>
              <li>
                {`Homeworld: ${homePlanet?.name}`}
                <Link to={currPerson?.homeworld.split('/').slice(-2)[0]}>
                  {homePlanet?.name}
                </Link>
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
};
