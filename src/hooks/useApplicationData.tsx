import { useApplicationStore } from '@store/applicationStore/useApplicationStore';
import { useEffect } from 'react';

const useApplicationData = (id: number | string) => {
  const { status, loading, error, fetchApplication } = useApplicationStore();

  useEffect(() => {
    fetchApplication(id); 
  }, [id, fetchApplication]);

  return { status, loading, error };
};

export default useApplicationData;
