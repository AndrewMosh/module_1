import { Layout, CardBase, ErrorBoundary } from '@shared';
import { Document, Formed } from '@pages';
import { useParams } from 'react-router-dom';
import { useDocumentStore } from '@store';

export const DocumentStep = () => {
  const { id } = useParams();
  const { success } = useDocumentStore();

  const currentStatus = 'CC_APPROVED';
  const renderContent = () => {
    if (success) {
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
