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
  const { loading:isLoading, error, data} = useApplicationData(id ?? '');

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Layout>
      {data?.statusHistory && data.statusHistory.length > 11 &&   <NotFound />}
      {id && !isSuccess  && !error && data?.statusHistory.length === 11 ? <SignForm id={id} /> : null}
      {isSuccess && <Signed />}
	  {error && <div className="sign__error2">Document has not been created or your application has been denied</div>}
    </Layout>
  );
};
