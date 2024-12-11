import { PrescoringForm } from '../PrescoringForm/PrescoringForm';
import { CardBase } from '@shared/UI/Card/CardBase/CardBase';
import './Prescoring.scss';
import { CustomizeCard } from '../CustomizeCard/CustomizeCard';
import { formName } from '../PrescoringForm/form.consts';
import useFormStore from '@store/formStore/useFormStore';
import { Offers } from '../Offers/Offers';

export const Prescoring = () => {
  const { forms } = useFormStore();

  const formState = forms[formName] || {
    isLoading: false,
    success: false,
    error: null,
  };

  return (
    <div id="prescoring" className="prescoring">
      {!formState.success && (
        <CardBase>
          <CustomizeCard />
          <PrescoringForm />
        </CardBase>
      )}
      {formState.success && <Offers />}
    </div>
  );
};
