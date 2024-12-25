import { Layout } from '@shared/Layout/Layout';
import { CodeInput } from './components/CodeInput/CodeInput';
import { useParams } from 'react-router-dom';
import Spinner from '@shared/Spinner/Spinner';
import { Completed } from './components/Completed/Completed';
import { useCodeStore } from '@store/codeStore/useCodeStore';
import useApplicationData from '@hooks/useApplicationData';
import { NotFound } from '@pages/NotFoundPage/components/NotFound/NotFound';

export const CodeStep = () => {
  const { id } = useParams();
  const { isSuccess } = useCodeStore();
  const { loading:isLoading, error, data, initialized} = useApplicationData(id ?? '');

  if ( isLoading || !initialized) {
    return <Spinner />;
  }
  const prevStatus='DOCUMENT_CREATED' 
  const statusInDemand = 'CREDIT_ISSUED'
  return (
    <Layout>
      {data?.status!==prevStatus && <NotFound />}
      {id &&  !isSuccess && data?.sesCode && !data?.signDate ? <CodeInput id={id} /> : null}
      {isSuccess &&  data?.status!==statusInDemand && <Completed />}
	  {error || data?.status!==statusInDemand && data?.status!==prevStatus &&   <div className="code__error2">Document has not been created or been denied</div>}
    </Layout>
  );
};
