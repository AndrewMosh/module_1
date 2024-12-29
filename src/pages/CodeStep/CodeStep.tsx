import { Layout, Spinner, useApplicationData } from '@shared';
import { CodeInput, Completed, NotFound } from '@pages';
import { useParams } from 'react-router-dom';
import { useCodeStore } from '@store';

export const CodeStep = () => {
  const { id } = useParams();
  const { isSuccess } = useCodeStore();
  const {
    loading: isLoading,
    error,
    data,
    initialized,
  } = useApplicationData(id ?? '');


  if (isLoading || !initialized) {
    return <Layout><Spinner /></Layout>;
  }

  const prevStatus = 'DOCUMENT_CREATED';
  const statusInDemand = 'CREDIT_ISSUED';

  const shouldRenderNotFound =
    data?.status !== prevStatus || !data?.sesCode || error;

  const shouldRenderCodeInput =
    id && !isSuccess && data?.sesCode && !data?.signDate;

  const shouldRenderCompleted = isSuccess && data?.status !== statusInDemand;

  return (
    <Layout>
      {shouldRenderNotFound && <NotFound />}
      {shouldRenderCodeInput && <CodeInput id={id} />}
      {shouldRenderCompleted && <Completed />}
    </Layout>
  );
};
