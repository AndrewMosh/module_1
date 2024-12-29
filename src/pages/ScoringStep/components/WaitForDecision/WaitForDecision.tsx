import { useEffect,  } from 'react';
import { Success} from '@shared';
import { useApplicationStore } from '@store';

export const WaitForDecision = ({ id }: { id: string }) => {
	const {fetchApplication} = useApplicationStore()

	useEffect(() => {
	  const timer = setTimeout(() => {
		fetchApplication(id ?? ''); 
	  }, 10000);
  
	  return () => clearTimeout(timer); 
	}, [fetchApplication, id]);
  

  return (
    <Success
      title="Wait for a decision on the application"
      text="The answer will come to your mail within 10 minutes"
    />
  );
};
