import { useState, useEffect } from 'react';

const useLocalStorageData = (
  key: string | undefined,
  stepKey: string,
) => {
  const [complete, setComplete] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = key ? localStorage.getItem(key) : null;
    if (data) {
      const parsedData = JSON.parse(data);
      if (parsedData[stepKey]) {
        setComplete(true);
      }
    }
    setLoading(false);
  }, [key, stepKey]);

  return { complete, loading };
};

export default useLocalStorageData;
