import { useEffect } from 'react';
import { Success } from '@shared';
import { useApplicationStore } from '@store';

export const WaitForDecision = ({ id }: { id: string }) => {
  const { data, fetchApplication } = useApplicationStore();

  useEffect(() => {
    const timer = setInterval(() => {
      fetchApplication(id);
    }, 10000);

    return () => clearInterval(timer);
  }, [id, fetchApplication]);

  useEffect(() => {
    if (data?.status === 'CC_DENIED') {
      window.location.href = '/loan';
    }
  }, [data]);

  return (
    <Success
      title="Wait for a decision on the application"
      text="The answer will come to your mail within 10 minutes"
    />
  );
};
