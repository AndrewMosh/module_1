import { PrescoringForm, Offers, SentToEmail } from '@pages';
import { CardBase, Spinner, useApplicationData } from '@shared';
import './Prescoring.scss';
import { formName } from '../PrescoringForm/form.consts';
import { useRestoreForm } from './hooks/useRestoreForm';
import { useEffect } from 'react';
import { useActiveStepStore } from '@store';

export const Prescoring = () => {
  const { forms, isRestored } = useRestoreForm();
  const applicationId = localStorage.getItem('currentId');
  const { data } = useApplicationData(applicationId ?? '');
  const { removeActiveStep } = useActiveStepStore();

  useEffect(() => {
    if (
      data?.status === 'CC_DENIED' ||
      data?.status === 'CREDIT_ISSUED' ||
      data?.status === 'CLIENT_DENIED'
    ) {
      removeActiveStep();
      localStorage.removeItem('currentId');
      window.location.href = '/loan';
    }
  }, [applicationId, data]);

  const formState = forms[formName] || {
    loading: false,
    success: false,
    error: null,
    data: null,
  };

  if (!isRestored) {
    return <Spinner />;
  }

  if (applicationId && data && data?.status !== 'PREAPPROVAL') {
    return (
      <div className="prescoring">
        <SentToEmail />
      </div>
    );
  }

  return (
    <div id="prescoring" className="prescoring">
      {!formState.success && !formState.data && (
        <CardBase>
          <PrescoringForm />
        </CardBase>
      )}
      {formState.success && formState.data && <Offers />}
    </div>
  );
};
