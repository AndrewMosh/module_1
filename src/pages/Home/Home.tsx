import {
  ExchangeRates,
  Features,
  NewsLetter,
  Map,
  News,
  CardSelection,
} from '@pages';
import { Layout } from '@shared';

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
