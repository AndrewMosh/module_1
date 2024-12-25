import { useParams } from 'react-router-dom';
import './Scoring.scss';
import { CardBase } from '@shared/UI/Card/CardBase/CardBase';
import { ScoringForm } from '../ScoringForm/ScoringForm';
import useScoringStore from '@store/scoringStore/useScoringStore';
import { formName } from '../ScoringForm/form.consts';
import { WaitForDecision } from '@pages/ScoringStep/components/WaitForDecision/WaitForDecision';
import Spinner from '@shared/Spinner/Spinner';
import useApplicationData from '@hooks/useApplicationData';
import { NotFound } from '@pages/NotFoundPage/components/NotFound/NotFound';

export const Scoring = () => {
	const { id } = useParams();
	const { forms } = useScoringStore();
	const { loading: isLoading, error, data, initialized } = useApplicationData(id ?? '');
  
	const formState = forms[formName] || {
	  isLoading: false,
	  success: false,
	  error: null,
	  data: null,
	};
  
	if (isLoading || !initialized) {
	  return <Spinner />;
	}
  
	if (error) {
	  return <div className="scoring__error">Error: {error}</div>;
	}
  
	if (!isLoading && data?.status !== 'APPROVED') {
	  return <NotFound />;
	}
  
	return (
	  <div className="scoring">
		{formState.success ? (
		  <WaitForDecision />
		) : (
		  <CardBase>{id ? <ScoringForm id={id} /> : null}</CardBase>
		)}
	  </div>
	);
  };
  