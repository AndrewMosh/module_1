import {usePrescoringStore} from '@store';
import { useEffect, useState } from 'react';

export const useRestoreForm = () => {
  const { forms, restoreFormState } = usePrescoringStore();
  const [isRestored, setIsRestored] = useState(false);

  useEffect(() => {
    restoreFormState();
    setIsRestored(true);
  }, [restoreFormState]);

  return { forms, isRestored };
};
