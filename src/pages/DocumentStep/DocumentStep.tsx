import { Layout } from '@shared/Layout/Layout';
import { Document } from './components/Document/Document';
import { useParams } from 'react-router-dom';
import useLocalStorageData from '@hooks/useLocalStorageData';
import Spinner from '@shared/Spinner/Spinner';
import { CardBase } from '@shared/UI/Card/CardBase/CardBase';
import { Formed } from './components/Formed/Formed';

export const DocumentStep = () => {
  const { id } = useParams();
  const { complete, loading } = useLocalStorageData(id, 'step3');

  if (loading) {
    return <Spinner />;
  }

  return (
    <Layout>
      {complete && <Formed />}
      {!complete && (
        <div className="scoring">
          <CardBase>{id ? <Document id={id} /> : null}</CardBase>
        </div>
      )}

      {/* {<Formed />}	 */}
    </Layout>
  );
};

