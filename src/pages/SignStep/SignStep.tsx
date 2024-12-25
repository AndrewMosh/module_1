import { Layout } from '@shared/Layout/Layout';
import { SignForm } from './components/SignForm/SignForm';
import { useParams } from 'react-router-dom';
import Spinner from '@shared/Spinner/Spinner';
import { useSignStore } from '@store/signStore/useSignStore';
import { Signed } from './components/Signed/Signed';
import useApplicationData from '@hooks/useApplicationData';
import { NotFound } from '@pages/NotFoundPage/components/NotFound/NotFound';

export const SignStep = () => {
  const { id } = useParams();
  const { isSuccess } = useSignStore();
  const { loading:isLoading, error, data, initialized} = useApplicationData(id ?? '');

  if (isLoading || !initialized) {
    return <Spinner />;
  }

  return (
    <Layout>
      {data?.sesCode &&   <NotFound />}

      {id && data?.status==='DOCUMENT_CREATED' && !isSuccess && !data?.sesCode &&<SignForm id={id} /> }
      {isSuccess && <Signed />}
	  {error && <div className="sign__error2">Document has not been created or your application has been denied</div>}
    </Layout>
  );
};
