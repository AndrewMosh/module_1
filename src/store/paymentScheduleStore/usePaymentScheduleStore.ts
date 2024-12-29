import { create } from 'zustand';
import { PaymentScheduleState } from './paymentSchedule.types';
import { apiUrl } from '@shared';

export const usePaymentScheduleStore = create<PaymentScheduleState>((set) => ({
  data: [],
  loading: false,
  error: null,

  fetchPaymentSchedule: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${apiUrl}/admin/application/${id}`);
      if (!response.ok) throw new Error('Failed to fetch payment schedule');

      const result = await response.json();
      set({ data: result.credit.paymentSchedule || [] });
    } catch (err) {
      if (err instanceof Error) {
        set({ error: err.message });
      }
    } finally {
      set({ loading: false });
    }
  },
}));
