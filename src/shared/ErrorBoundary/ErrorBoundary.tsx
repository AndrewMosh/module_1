import React, { useState } from 'react';
import { Spinner, useApplicationData, Error, Status, Button } from '@shared';
import { statuses } from './boundary.consts';
import './boundary.scss';
import { useActiveStepStore } from '@store';

export const ErrorBoundary = ({
  status,
  id,
  children,
}: {
  status: keyof typeof statuses;
  id: string;
  children: React.ReactNode;
}) => {
  const { loading, error, data, initialized } = useApplicationData(id ?? '');
  const applicationId = localStorage.getItem('currentId');
  const { removeActiveStep } = useActiveStepStore();

  const [isNavigating, setIsNavigating] = useState(false);

  const handleNewApplication = () => {
    setIsNavigating(true);
    removeActiveStep();
    localStorage.removeItem('currentId');
    window.location.href = '/loan';
  };

  if (loading || !initialized || isNavigating) {
    return <Spinner />;
  }

  if (error) {
    return error ? <Error message={error} /> : null;
  }

  if (applicationId !== id) {
    return <Error message="Application not found" />;
  }

  const shouldShowButton = data?.status === 'CC_DENIED' || data?.status === 'CREDIT_ISSUED' ;

  if (data?.status && data.status !== status) {
    const statusMessage = statuses[data.status as keyof typeof statuses];
    return (
      <div className="boundary">
        <Status message={statusMessage || 'Unknown status'} />
		{shouldShowButton && <Button className="boundary__button" onClick={handleNewApplication}>
          Start a new application
        </Button>}
        
      </div>
    );
  }

  return <>{children}</>;
};
