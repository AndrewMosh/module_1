import { AsyncState } from '@shared';

export type TSchedule = {
  date: string | Date;
  debtPayment: number;
  interestPayment: number;
  number: number;
  remainingDebt: number;
  totalPayment: number;
};

export interface PaymentScheduleState extends AsyncState<TSchedule | null> {
  fetchPaymentSchedule: (id: string) => Promise<void>;
}
