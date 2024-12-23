import { Layout } from '@shared/Layout/Layout';
import { SignForm } from './components/SignForm/SignForm';
import { useParams } from 'react-router-dom';
import useLocalStorageData from '@hooks/useLocalStorageData';
import Spinner from '@shared/Spinner/Spinner';
import { useSignStore } from '@store/signStore/useSignStore';
import { Signed } from './components/Signed/Signed';

export const SignStep = () => {
  const { id } = useParams();
  const { complete, loading } = useLocalStorageData(id ?? '', 'step4');
  const { isSuccess } = useSignStore();

  if (loading) {
    return <Spinner />;
  }
  return (
    <Layout>
      {complete && <Signed />}
      {id && !isSuccess && !complete ? <SignForm id={id} /> : null}
      {isSuccess && <Signed />}
    </Layout>
  );
};
