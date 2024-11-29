import { AboutCard } from '@components/AboutCard/AboutCard';
import { Cashback } from '@components/Cashback/Cashback';
import { Faq } from '@components/Faq/Faq';
import { RatesAndConditions } from '@components/RatesAndConditions/RatesAndConditions';

export const tabs = [
  {
    label: 'About card',
    content: <AboutCard />,
  },
  {
    label: 'Rates and conditions',
    content: <RatesAndConditions />,
  },
  {
    label: 'Cashback',
    content: <Cashback />,
  },
  {
    label: 'FAQ',
    content: <Faq />,
  },
];
