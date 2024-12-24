import { Layout } from '@shared/Layout/Layout';
import { CodeInput } from './components/CodeInput/CodeInput';
import { useParams } from 'react-router-dom';
import useLocalStorageData from '@hooks/useLocalStorageData';
import Spinner from '@shared/Spinner/Spinner';
import { Completed } from './components/Completed/Completed';
import { useCodeStore } from '@store/codeStore/useCodeStore';
import useApplicationData from '@hooks/useApplicationData';

export const CodeStep = () => {
  const { id } = useParams();
  const { complete, loading } = useLocalStorageData(id ?? '', 'step5');
  const { isSuccess } = useCodeStore();
  const { loading:isLoading, error, status} = useApplicationData(id ?? '');

  if (loading || isLoading) {
    return <Spinner />;
  }
  const prevStatus='DOCUMENT_CREATED' 
  const statusInDemand = 'CREDIT_ISSUED'
  return (
    <Layout>
      {complete && <Completed />}
      {id && !complete && !isSuccess && status===prevStatus ? <CodeInput id={id} /> : null}
      {isSuccess && !complete && status!==statusInDemand && <Completed />}
	  {error || status!==statusInDemand && status!==prevStatus &&   <div className="code__error2">Document has not been created or been denied</div>}
    </Layout>
  );
};
