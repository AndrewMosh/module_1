import { create } from 'zustand';

interface PaymentScheduleState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[]; 
  loading: boolean;
  error: string | null;
  fetchPaymentSchedule: (id: string) => Promise<void>;
}

const apiUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:8080';

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
