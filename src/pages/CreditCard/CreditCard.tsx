import { Layout } from '@shared/Layout/Layout';
import { AmountSlider } from '@pages/CreditCard/components/AmountSlider/AmountSlider';
import { InfoSection } from '@pages/CreditCard/components/InfoSection/InfoSection';
import { HowToGet } from '@pages/CreditCard/components/HowToGet/HowToGet';
import { PlatinumCard } from '@pages/CreditCard/components/PlatinumCard/PlatinumCard';


export const CreditCard = () => {
  return (
    <Layout>
      <PlatinumCard />
      <HowToGet />
      <InfoSection />
	  <AmountSlider/>
    </Layout>
  );
};
