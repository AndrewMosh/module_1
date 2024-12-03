import { CardSelection } from '@components/CardSelection/CardSelection';
import ExchangeRates from '@components/ExchangeRates/ExchangeRates';
import Features from '@components/Features/Features';
import { Layout } from '@components/Layout/Layout';
import { NewsLetter } from '@components/NewsLetter/NewsLetter';
import { Map } from '@components/Map/Map';
import { News } from '@components/News/News';

export default function Home() {
  return (
    <Layout>
      <CardSelection />
      <Features />
      <ExchangeRates />
      <Map />
      <News />
      <NewsLetter />
    </Layout>
  );
}
