type TSchedule = {
  date: string | Date;
  debtPayment: number;
  interestPayment: number;
  number: number;
  remainingDebt: number;
  totalPayment: number;
};

export interface PaymentScheduleState {
  data: TSchedule[];
  loading: boolean;
  error: string | null;
  fetchPaymentSchedule: (id: string) => Promise<void>;
}
