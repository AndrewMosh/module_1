import { Layout } from '@shared';
import { InfoSection, HowToGet, PlatinumCard, Prescoring  } from '@pages';

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
