type TOffer = {
  id: number;
  offer: string;
  percentage: string;
  tooltip?: string;
};

export const offers: TOffer[] = [
  { id: 1, offer: 'Up to 160 days', percentage: 'No percent', tooltip:'When repaying the full debt up to 160 days.' },
  { id: 2, offer: 'Up to 600 000 ₽', percentage: 'Credit limit', tooltip:'Over the limit willaccrue percent' },
  { id: 3, offer: '0 ₽', percentage: 'Card service is free', tooltip:'Promotion valid until December 31, 2022.' },
];
