import { useApplicationStore } from '@store/applicationStore/useApplicationStore';
import { useEffect } from 'react';

const useApplicationData = (id: number | string) => {
  const { data, loading, error, fetchApplication } = useApplicationStore();

  useEffect(() => {
    fetchApplication(id); 
  }, [id, fetchApplication]);

  return { data, loading, error };
};

export default useApplicationData;
