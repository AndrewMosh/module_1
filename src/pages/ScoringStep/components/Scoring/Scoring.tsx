import { useParams } from 'react-router-dom';
import './Scoring.scss';
import { CardBase } from '@shared/UI/Card/CardBase/CardBase';
import { ScoringForm } from '../ScoringForm/ScoringForm';
import useScoringStore from '@store/scoringStore/useScoringStore';
import { formName } from '../ScoringForm/form.consts';
import { WaitForDecision } from '@pages/CreditCard/components/WaitForDecision/WaitForDecision';

export const Scoring = () => {
  const { id } = useParams();
  const { forms } = useScoringStore();

  const formState = forms[formName] || {
    isLoading: false,
    success: false,
    error: null,
    data: null,
  };

  return (
    <>
      {!formState.success && (
        <div className="scoring">
          <CardBase>{id ? <ScoringForm id={id} /> : null}</CardBase>
        </div>
      )}

      {formState.success && <WaitForDecision />}
    </>
  );
};
