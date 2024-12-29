import { useParams } from 'react-router-dom';
import { useSignStore } from '@store';
import { Signed } from './components/Signed/Signed';
import { NotFound } from '@pages';
import { Layout, Spinner, useApplicationData } from '@shared';
import { SignForm } from './components/SignForm/SignForm';

export const SignStep = () => {
  const { id } = useParams();
  const { isSuccess } = useSignStore();
  const { loading: isLoading, error, data, initialized } = useApplicationData(id ?? '');

  if (isLoading || !initialized) {
    return <Spinner />;
  }

  const isValidStatus = (status: string) => [
	'CREDIT_ISSUED',
	'CC_APPROVED',
	'APPROVED',
	'DENIED',
	'CLIENT_DENIED',
	'CC_DENIED',
	'PREAPPROVAL'
  ].includes(status);
  
  const isSigned = data?.sesCode || data?.signDate || (data?.status && isValidStatus(data.status));
  

  return (
    <Layout>
      {isSigned  &&   <NotFound />}
      {id && data?.status==='DOCUMENT_CREATED' && !isSuccess && !data?.sesCode &&<SignForm id={id} /> }
      {isSuccess && <Signed />}
	  {error && <div className="sign__error2">Document has not been created or your application has been denied</div>}
    </Layout>
  );
};
