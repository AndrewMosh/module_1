import { AsyncState } from '@shared';

export type TSchedule = {
  id: number;
  date: string | Date;
  debtPayment: number;
  interestPayment: number;
  number: number;
  remainingDebt: number;
  totalPayment: number;
};

export interface PaymentScheduleState extends AsyncState<TSchedule | []> {
  fetchPaymentSchedule: (id: string) => Promise<void>;
}
