import { Layout } from '@shared/Layout/Layout';
import { Document } from './components/Document/Document';
import { useParams } from 'react-router-dom';
import Spinner from '@shared/Spinner/Spinner';
import { CardBase } from '@shared/UI/Card/CardBase/CardBase';
import { Formed } from './components/Formed/Formed';
import { useDocumentStore } from '@store/documetStore/useDocumentStore';
import useLocalStorageData from '@hooks/useLocalStorageData';


export const DocumentStep = () => {
  const { id } = useParams();
  const { isSuccess } = useDocumentStore();
  const {complete, loading} = useLocalStorageData(id ?? '', 'step3')

  if (loading) {
    return <Spinner />;
  }

  return (
    <Layout>
      {complete &&  <Formed />}

      {!isSuccess  && !complete && (
        <div className="scoring">
          <CardBase>{id ? <Document id={id} /> : null}</CardBase>
        </div>
      )}
      {isSuccess && <Formed />}
    </Layout>
  );
};
