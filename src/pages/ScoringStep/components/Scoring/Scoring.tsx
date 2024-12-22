import { useParams } from 'react-router-dom';
import './Scoring.scss';
import { CardBase } from '@shared/UI/Card/CardBase/CardBase';
import { ScoringForm } from '../ScoringForm/ScoringForm';
import useScoringStore from '@store/scoringStore/useScoringStore';
import { formName } from '../ScoringForm/form.consts';
import { WaitForDecision } from '@pages/ScoringStep/components/WaitForDecision/WaitForDecision';
import useLocalStorageData from '@hooks/useLocalStorageData'; // Подключаем хук
import Spinner from '@shared/Spinner/Spinner';

export const Scoring = () => {
  const { id } = useParams();
  const { forms } = useScoringStore();
  const { complete, loading } = useLocalStorageData(id ?? '', 'step2'); 

  const formState = forms[formName] || {
    isLoading: false,
    success: false,
    error: null,
    data: null,
  };

  if (loading) {
    return <Spinner/>; 
  }

  return (
    <>
      {complete && <WaitForDecision />}
      {!formState.success && !complete && (
        <div className="scoring">
          <CardBase>{id ? <ScoringForm id={id} /> : null}</CardBase>
        </div>
      )}

      {formState.success && <WaitForDecision />}
    </>
  );
};
