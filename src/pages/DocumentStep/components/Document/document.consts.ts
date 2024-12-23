import { Column } from '@shared/UI/Table/table.types';

export const columns: Column[] = [
  { key: 'number', title: 'Number' },
  { key: 'date', title: 'Date' },
  { key: 'totalPayment', title: 'Total Payment' },
  { key: 'interestPayment', title: 'Interest Payment' },
  { key: 'debtPayment', title: 'Debt Payment' },
  { key: 'remainingDebt', title: 'Remaining Debt' },
];
