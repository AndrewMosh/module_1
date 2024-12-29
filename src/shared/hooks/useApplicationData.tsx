import { useApplicationStore } from '@store';
import { useEffect } from 'react';

export const useApplicationData = (id: number | string) => {
  const { data, loading, error, fetchApplication, initialized } =
    useApplicationStore();

  useEffect(() => {
    if (id) {
      fetchApplication(id);
    }
  }, [id]);

  return { data, loading, error, initialized };
};

