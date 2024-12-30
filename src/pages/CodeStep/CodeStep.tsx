import { ErrorBoundary, Layout } from '@shared';
import { CodeInput, Completed } from '@pages';
import { useParams } from 'react-router-dom';
import { useCodeStore } from '@store';

export const CodeStep = () => {
  const { id } = useParams();
  const { isSuccess } = useCodeStore();

  const currentStatus = 'DOCUMENT_CREATED';
  const renderContent = () => {
    if (isSuccess) {
      return <Completed />;
    }

    return <div className="scoring">{id && <CodeInput id={id} />}</div>;
  };

  return (
    <Layout>
      {id && (
        <ErrorBoundary id={id} status={currentStatus}>
          {renderContent()}
        </ErrorBoundary>
      )}
    </Layout>
  );
};
