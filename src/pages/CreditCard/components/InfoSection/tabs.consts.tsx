import { AboutCard } from '@pages/CreditCard/components/AboutCard/AboutCard';
import { Cashback } from '@pages/CreditCard/components/Cashback/Cashback';
import { Faq } from '@pages/CreditCard/components/Faq/Faq';
import { RatesAndConditions } from '@pages/CreditCard/components/RatesAndConditions/RatesAndConditions';

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
