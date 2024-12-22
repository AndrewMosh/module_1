import { useState, useEffect } from 'react';

const useLocalStorageData = (key:string, stepKey:string) => {
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

  const updateStep = (nextStepKey: string) => {
    const data = key ? localStorage.getItem(key) : null;
    if (data) {
      const parsedData = JSON.parse(data);

      parsedData[nextStepKey] = true;

      localStorage.setItem(key, JSON.stringify(parsedData));
    }
  };

  return { complete, loading, updateStep };
};

export default useLocalStorageData;
