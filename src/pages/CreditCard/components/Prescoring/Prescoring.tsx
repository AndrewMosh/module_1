import { PrescoringForm } from '../PrescoringForm/PrescoringForm';
import { CardBase } from '@shared/UI/Card/CardBase/CardBase';
import './Prescoring.scss';
import { CustomizeCard } from '../CustomizeCard/CustomizeCard';

export const Prescoring = () => {
  return (
    <div id="prescoring" className="prescoring">
      <CardBase>
        <CustomizeCard />
        <PrescoringForm />
      </CardBase>
    </div>
  );
};
