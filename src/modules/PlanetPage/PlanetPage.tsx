import { useParams } from 'react-router-dom';

import { PlanetInfo } from '../../components/PlanetInfo';
import { Film } from '../../types/Film';
import { Person } from '../../types/Person';

interface Props {
  people: Person[],
  films: Film[],
}

export const PlanetPage: React.FC<Props> = ({ people, films }) => {
  const { name = '' } = useParams();

  return (
    <div className="page__section">
      <PlanetInfo
        planetId={name}
        people={people}
        films={films}
      />
    </div>
  );
};
