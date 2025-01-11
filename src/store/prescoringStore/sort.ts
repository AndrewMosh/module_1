type SortCriteria<T> = keyof T;
type SortOrder = 'asc' | 'desc';

export function sortOffers<T>(
  offers: T[],
  criteria: { key: SortCriteria<T>; order: SortOrder }[],
): T[] {
  return [...offers].sort((a, b) => {
    for (const { key, order } of criteria) {
      if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
    }
    return 0;
  });
}

export const criteria = [
  { key: 'rate', order: 'asc' },
  { key: 'monthlyPayment', order: 'asc' },
  { key: 'totalAmount', order: 'asc' },
];
