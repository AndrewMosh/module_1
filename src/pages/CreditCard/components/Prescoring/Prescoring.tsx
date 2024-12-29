import { PrescoringForm } from '../PrescoringForm/PrescoringForm';
import { CardBase } from '@shared/UI/Card/CardBase/CardBase';
import './Prescoring.scss';
import { CustomizeCard } from '../CustomizeCard/CustomizeCard';
import { formName } from '../PrescoringForm/form.consts';
import { Offers } from '../Offers/Offers';
import Spinner from '@shared/Spinner/Spinner';
import { useRestoreForm } from './hooks/useRestoreForm';

export const Prescoring = () => {
	const { forms, isRestored}= useRestoreForm()


  const formState = forms[formName] || {
    isLoading: false,
    success: false,
    error: null,
    data: null,
  };

  if (!isRestored) {
    return <Spinner />;
  }

  return (
    <div id="prescoring" className="prescoring">
      {!formState.success && !formState.data && (
        <CardBase>
          <CustomizeCard />
          <PrescoringForm />
        </CardBase>
      )}
      {formState.success && formState.data && <Offers />}
    </div>
  );
};
