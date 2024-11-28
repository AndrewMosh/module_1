type TOffer = {
  id: number;
  offer: string;
  percentage: string;
};

export const offers: TOffer[] = [
  { id: 1, offer: 'Up to 160 days', percentage: 'No percent' },
  { id: 2, offer: 'Up to 600 000 ₽', percentage: 'Credit limit' },
  { id: 3, offer: '0 ₽', percentage: 'Card service is free' },
];
