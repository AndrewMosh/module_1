import { useParams } from 'react-router-dom';
import './Scoring.scss';
import { CardBase, Spinner, useApplicationData } from '@shared';
import { ScoringForm, WaitForDecision,NotFound } from '@pages';
import {useScoringStore} from '@store';
import { formName } from '../ScoringForm/form.consts';

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

  if (data?.status !== 'APPROVED') {
    return <NotFound />;
  }

  const renderContent = () => {
    if (formState.success) {
      return <WaitForDecision />;
    }

    return id ? (
      <CardBase>
        <ScoringForm id={id} />
      </CardBase>
    ) : null;
  };

  return <div className="scoring">{renderContent()}</div>;
};
