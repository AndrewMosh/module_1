import { useEffect, useState } from 'react';
import { PrescoringForm } from '../PrescoringForm/PrescoringForm';
import { CardBase } from '@shared/UI/Card/CardBase/CardBase';
import './Prescoring.scss';
import { CustomizeCard } from '../CustomizeCard/CustomizeCard';
import { formName } from '../PrescoringForm/form.consts';
import useFormStore from '@store/formStore/useFormStore';
import { Offers } from '../Offers/Offers';
import Spinner from '@shared/Spinner/Spinner';

export const Prescoring = () => {
  const { forms, restoreFormState } = useFormStore();
  const [isRestored, setIsRestored] = useState(false); 

  useEffect(() => {
    restoreFormState();
    setIsRestored(true); 
  }, [restoreFormState]);

  const formState = forms[formName] || {
    isLoading: false,
    success: false,
    error: null,
    data: null,
  };

  if (!isRestored) {
    return <Spinner/>; 
  }

  return (
    <div id="prescoring" className="prescoring">
      {!formState.success && !formState.data && (
        <CardBase>
          <CustomizeCard />
          <PrescoringForm />
        </CardBase>
      )}
      {formState.success && formState.data && <Offers />}
	  {}
    </div>
  );
};
