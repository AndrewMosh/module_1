import { Layout } from '@shared/Layout/Layout';
import { CodeInput } from './components/CodeInput/CodeInput';
import { useParams } from 'react-router-dom';
import Spinner from '@shared/Spinner/Spinner';
import { Completed } from './components/Completed/Completed';
import { useCodeStore } from '@store/codeStore/useCodeStore';
import useApplicationData from '@shared/hooks/useApplicationData';
import { NotFound } from '@pages/NotFoundPage/components/NotFound/NotFound';

export const CodeStep = () => {
  const { id } = useParams();
  const { isSuccess } = useCodeStore();
  const { loading: isLoading, error, data, initialized } = useApplicationData(id ?? '');

  if (isLoading || !initialized) {
    return <Spinner />;
  }

  const prevStatus = 'DOCUMENT_CREATED';
  const statusInDemand = 'CREDIT_ISSUED';

  const shouldRenderNotFound = 
    data?.status !== prevStatus || !data?.sesCode || error;

  const shouldRenderCodeInput = 
    id && !isSuccess && data?.sesCode && !data?.signDate;

  const shouldRenderCompleted = 
    isSuccess && data?.status !== statusInDemand;

  return (
    <Layout>
      {shouldRenderNotFound && <NotFound />}
      {shouldRenderCodeInput && <CodeInput id={id} />}
      {shouldRenderCompleted && <Completed />}
    </Layout>
  );
};
