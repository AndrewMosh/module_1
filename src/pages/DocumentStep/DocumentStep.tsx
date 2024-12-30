import { Layout, CardBase, ErrorBoundary } from '@shared';
import { Document, Formed } from '@pages';
import { useParams } from 'react-router-dom';
import { useDocumentStore } from '@store';

export const DocumentStep = () => {
  const { id } = useParams();
  const { isSuccess } = useDocumentStore();

  const currentStatus = 'CC_APPROVED';
  const renderContent = () => {
    if (isSuccess) {
      return <Formed />;
    }

    return (
      <div className="scoring">
        <CardBase>{id && <Document id={id} />}</CardBase>
      </div>
    );
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
