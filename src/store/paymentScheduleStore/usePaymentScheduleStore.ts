import { create } from 'zustand';
import axios from 'axios';
import { PaymentScheduleState } from './paymentSchedule.types';
import { apiUrl } from '@shared';

export const usePaymentScheduleStore = create<PaymentScheduleState>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchPaymentSchedule: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${apiUrl}/admin/application/${id}`);
      set({ data: response.data.credit.paymentSchedule || [] });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        set({ error: err.message });
      } else {
        set({ error: 'An unexpected error occurred' });
      }
    } finally {
      set({ loading: false });
    }
  },
}));
