// import ExchangeRates from '@pages/Home/components/ExchangeRates/ExchangeRates';
import Features from '@pages/Home/components/Features/Features';
import { Layout } from '@shared/Layout/Layout';
import { NewsLetter } from '@pages/Home/components/NewsLetter/NewsLetter';
import { Map } from '@pages/Home/components/Map/Map';
// import { News } from '@pages/Home/components/News/News';
import { CardSelection } from '@pages/Home/components/CardSelection/CardSelection';

export default function Home() {
  return (
    <Layout>
      <CardSelection />
      <Features />
      {/* <ExchangeRates /> */}
      <Map />
      {/* <News /> */}
      <NewsLetter />
    </Layout>
  );
}
