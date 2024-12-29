import { useApplicationStore } from '@store/applicationStore/useApplicationStore';
import { useEffect } from 'react';

const useApplicationData = (id: number | string) => {
  const { data, loading, error, fetchApplication, initialized } = useApplicationStore();

  useEffect(() => {
	if (id) {
		fetchApplication(id); 
	}
    
  }, [id]);

  return { data, loading, error, initialized };
};

export default useApplicationData;
