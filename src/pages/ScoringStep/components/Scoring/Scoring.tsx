import { useParams } from 'react-router-dom';
import './Scoring.scss';
import { CardBase, ErrorBoundary } from '@shared';
import { ScoringForm, WaitForDecision } from '@pages';
import { useScoringStore } from '@store';
import { formName } from '../ScoringForm/form.consts';

export const Scoring = () => {
  const { id } = useParams();
  const { forms } = useScoringStore();

  const currentStatus = 'APPROVED';

  const formState = forms[formName] || {
    loading: false,
    success: false,
    error: null,
    data: null,
  };

  const renderContent = () => {
    if (formState.success) {
      return id && <WaitForDecision id={id} />;
    }

    return id ? (
      <CardBase>
        <ScoringForm id={id} />
      </CardBase>
    ) : null;
  };

  return (
    id && (
      <ErrorBoundary status={currentStatus} id={id}>
        <div className="scoring">{renderContent()}</div>
      </ErrorBoundary>
    )
  );
};
