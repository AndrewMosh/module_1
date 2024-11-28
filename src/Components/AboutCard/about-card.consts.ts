import money from '@assets/svg/Money.svg';
import calendar from '@assets/svg/Calendar.svg';
import clock from '@assets/svg/Clock.svg';
import bag from '@assets/svg/Bag.svg';
import credit from '@assets/svg/Credit-card.svg';

type TCard = {
  id: number;
  icon: string;
  title: string;
  description: string;
};

export const about_cards: TCard[] = [
  {
    id: 1,
    icon: money,
    title: 'Up to 50 000 ₽',
    description: 'Cash and transfers without commission and percent',
  },
  {
    id: 2,
    icon: calendar,
    title: 'Up to 160 days',
    description: 'Without percent on the loan',
  },
  {
    id: 3,
    icon: clock,
    title: 'Free delivery',
    description:
      'We will deliver your card by courier at a convenient place and time for you',
  },
  {
    id: 4,
    icon: bag,
    title: 'Up to 12 months',
    description:
      'No percent. For equipment, clothes and other purchases in installments',
  },
  {
    id: 5,
    icon: credit,
    title: 'Convenient deposit and withdrawal',
    description:
      'At any ATM. Top up your credit card for free with cash or transfer from other cards',
  },
];
