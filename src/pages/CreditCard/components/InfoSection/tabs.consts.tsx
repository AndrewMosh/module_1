import { AboutCard, Cashback, Faq, RatesAndConditions } from '@pages';

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
