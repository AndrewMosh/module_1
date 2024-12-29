import { Layout, Spinner, CardBase, useApplicationData } from '@shared';
import { Document, Formed, NotFound } from '@pages';
import { useParams } from 'react-router-dom';
import { useDocumentStore } from '@store';

export const DocumentStep = () => {
  const { id } = useParams();
  const { isSuccess } = useDocumentStore();
  const {
    loading: isLoading,
    data,
    initialized,
  } = useApplicationData(id ?? '');

  if (isLoading || !initialized) {
    return <Layout><Spinner /></Layout>;
  }

  const renderContent = () => {
    if (data?.status === 'CLIENT_DENIED') {
      return (
        <div className="document__error">
          Application was denied by the client
        </div>
      );
    }

    if (!isSuccess) {
      if (data?.status !== 'CC_APPROVED') {
        return <NotFound />;
      }

      return (
        <div className="scoring">
          <CardBase>{id && <Document id={id} />}</CardBase>
        </div>
      );
    }

    return <Formed />;
  };

  return <Layout>{renderContent()}</Layout>;
};
