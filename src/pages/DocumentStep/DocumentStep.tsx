import { Layout, Spinner, CardBase, useApplicationData  } from '@shared';
import { Document } from './components/Document/Document';
import { useParams } from 'react-router-dom';
import { Formed } from './components/Formed/Formed';
import { useDocumentStore } from '@store';
import { NotFound } from '@pages/NotFoundPage/components/NotFound/NotFound';

export const DocumentStep = () => {
  const { id } = useParams();
  const { isSuccess } = useDocumentStore();
  const { loading: isLoading, data, initialized } = useApplicationData(id ?? '');

  if (isLoading || !initialized) {
    return <Spinner />;
  }

  const renderContent = () => {
    if (data?.status === 'CLIENT_DENIED') {
      return <div className="document__error">Application was denied by the client</div>;
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
