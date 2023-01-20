import { useParams } from 'react-router-dom';

import { PlanetInfo } from '../../components/PlanetInfo';

export const PlanetPage: React.FC = () => {
  const { name = '' } = useParams();

  return (
    <div className="page__section">
      <PlanetInfo planetId={name} />
    </div>
  );
};
