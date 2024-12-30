import { useParams } from 'react-router-dom';
import { useSignStore } from '@store';
import { Signed, SignForm } from '@pages';
import { Layout, ErrorBoundary } from '@shared';

export const SignStep = () => {
  const { id } = useParams();
  const { success } = useSignStore();

  const currentStatus = 'DOCUMENT_CREATED';
  const renderContent = () => {
    if (success) {
      return <Signed />;
    }

    return <div className="scoring">{id && <SignForm id={id} />}</div>;
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
