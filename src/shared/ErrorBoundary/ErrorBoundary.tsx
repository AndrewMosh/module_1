import { Spinner, useApplicationData, Error, Status } from '@shared';
import { statuses } from './boundary.consts';

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

  if (loading || !initialized) {
    return <Spinner />;
  }

  if (error) {
    return error ? <Error message={error} /> : null;
  }

  if (data?.status && data.status !== status) {
    const statusMessage = statuses[data.status as keyof typeof statuses];
    return <Status message={statusMessage || 'Unknown status'} />;
  }

  return <>{children}</>;
};
