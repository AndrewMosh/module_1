import { Layout } from '@shared/Layout/Layout';
import { Document } from './components/Document/Document';
import { useParams } from 'react-router-dom';
import Spinner from '@shared/Spinner/Spinner';
import { CardBase } from '@shared/UI/Card/CardBase/CardBase';
import { Formed } from './components/Formed/Formed';
import { useDocumentStore } from '@store/documetStore/useDocumentStore';
import useApplicationData from '@hooks/useApplicationData';
import { NotFound } from '@pages/NotFoundPage/components/NotFound/NotFound';



export const DocumentStep = () => {
  const { id } = useParams();
  const { isSuccess } = useDocumentStore();
  const { loading:isLoading, data } = useApplicationData(id ?? '');

 

  if (isLoading) {
    return <Spinner />;
  }

  
  return (
    <Layout>
      {data?.statusHistory && data.statusHistory.length > 3   && <NotFound/>}

      {!isSuccess && data?.statusHistory.length===3 && (
        <div className="scoring">
          <CardBase>{id ? <Document id={id} /> : null}</CardBase>
        </div>
      )}
      {isSuccess && <Formed />}
	  {data?.status==='CLIENT_DENIED' && <div className="document__error">Application was denied by the client</div>}
    </Layout>
  );
};
