import { Layout } from '@shared/Layout/Layout';
import { InfoSection } from '@pages/CreditCard/components/InfoSection/InfoSection';
import { HowToGet } from '@pages/CreditCard/components/HowToGet/HowToGet';
import { PlatinumCard } from '@pages/CreditCard/components/PlatinumCard/PlatinumCard';
import { Prescoring } from './components/Prescoring/Prescoring';

export const CreditCard = () => {
  return (
    <Layout>
      <PlatinumCard />
      <InfoSection />
      <HowToGet />
      <Prescoring />
    </Layout>
  );
};
