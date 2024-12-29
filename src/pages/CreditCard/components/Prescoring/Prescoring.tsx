import { PrescoringForm, Offers, CustomizeCard } from '@pages';
import { CardBase, Spinner } from '@shared';
import './Prescoring.scss';
import { formName } from '../PrescoringForm/form.consts';
import { useRestoreForm } from './hooks/useRestoreForm';

export const Prescoring = () => {
  const { forms, isRestored } = useRestoreForm();

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
