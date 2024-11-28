type TConditions = {
  id: number;
  title: string;
  description: string | React.ReactNode;
};

export const conditions: TConditions[] = [
  {
    id: 1,
    title: 'Card currency',
    description: 'Rubles, dollars, euro',
  },
  {
    id: 2,
    title: 'Interest free period',
    description: '0% up to 160 days',
  },
  {
    id: 3,
    title: 'Payment system',
    description: 'Mastercard, Visa',
  },
  {
    id: 4,
    title: 'Maximum credit limit on the card',
    description: '600 000 ₽',
  },
  {
    id: 5,
    title: 'Replenishment and withdrawal',
    description:
      'At any ATM. Top up your credit card for free with cash or transfer from other cards',
  },
  {
    id: 6,
    title: 'Max cashback per month',
    description: '15 000 ₽',
  },
  {
    id: 7,
    title: 'Transaction Alert',
    description: (
      <>
        60 ₽ — SMS or push notifications <br /> 0 ₽ — card statement,
        information about transactions in the online bank
      </>
    ),
  },
];
