import { Layout } from '@shared/Layout/Layout';
import { CodeInput } from './components/CodeInput/CodeInput';
import { useParams } from 'react-router-dom';
import useLocalStorageData from '@hooks/useLocalStorageData';
import Spinner from '@shared/Spinner/Spinner';
import { Completed } from './components/Completed/Completed';
import { useCodeStore } from '@store/codeStore/useCodeStore';

export const CodeStep = () => {
  const { id } = useParams();
  const { complete, loading } = useLocalStorageData(id ?? '', 'step5');
  const { isSuccess } = useCodeStore();

  if (loading) {
    return <Spinner />;
  }
  return (
    <Layout>
      {complete && <Completed />}
      {id && !complete && !isSuccess ? <CodeInput id={id} /> : null}
      {isSuccess && !complete && <Completed />}
    </Layout>
  );
};
