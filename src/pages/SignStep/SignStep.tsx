import { Layout } from '@shared/Layout/Layout';
import { SignForm } from './components/SignForm/SignForm';
import { useParams } from 'react-router-dom';
import useLocalStorageData from '@hooks/useLocalStorageData';
import Spinner from '@shared/Spinner/Spinner';
import { useSignStore } from '@store/signStore/useSignStore';
import { Signed } from './components/Signed/Signed';
import useApplicationData from '@hooks/useApplicationData';

export const SignStep = () => {
  const { id } = useParams();
  const { complete, loading } = useLocalStorageData(id ?? '', 'step4');
  const { isSuccess } = useSignStore();
  const { loading:isLoading, error, status} = useApplicationData(id ?? '');

  if (loading || isLoading) {
    return <Spinner />;
  }
  const statusInDemand= 'DOCUMENT_CREATED'
  return (
    <Layout>
      {complete && <Signed />}
      {id && !isSuccess && !complete && !error && status===statusInDemand ? <SignForm id={id} /> : null}
      {isSuccess && <Signed />}
	  {error || status!== statusInDemand &&  <div className="sign__error2">Документы еще не подписаны или заявка была отклонена</div>}
    </Layout>
  );
};
