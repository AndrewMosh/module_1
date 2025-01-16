import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { usePaymentScheduleStore } from '@store';

vi.mock('axios');

describe('usePaymentScheduleStore', () => {
  beforeEach(() => {
    usePaymentScheduleStore.setState({ data: [], loading: false, error: null });
    vi.clearAllMocks();
  });

  it('should have initial state', () => {
    const state = usePaymentScheduleStore.getState();
    expect(state.data).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should fetch payment schedule and update state on success', async () => {
    const mockData = {
      credit: { paymentSchedule: [{ id: 1, amount: 100 }] },
    };

    (axios.get as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ data: mockData });

    const { fetchPaymentSchedule } = usePaymentScheduleStore.getState();

    const fetchPromise = fetchPaymentSchedule('1');

    expect(usePaymentScheduleStore.getState().loading).toBe(true);

    await fetchPromise;

    const state = usePaymentScheduleStore.getState();
    expect(state.loading).toBe(false);
    expect(state.data).toEqual(mockData.credit.paymentSchedule);
    expect(state.error).toBeNull();
  });

  it('should handle error and update state on failure', async () => {
    (axios.get as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce({
      message: 'An unexpected error occurred',
    });

    const { fetchPaymentSchedule } = usePaymentScheduleStore.getState();

    const fetchPromise = fetchPaymentSchedule('2');

    expect(usePaymentScheduleStore.getState().loading).toBe(true);

    await fetchPromise;

    const state = usePaymentScheduleStore.getState();
    expect(state.loading).toBe(false);
    expect(state.data).toEqual([]);
    expect(state.error).toBe('An unexpected error occurred');
  });

  it('should handle unexpected error', async () => {
    (axios.get as unknown as ReturnType<typeof vi.fn>).mockImplementation(() => {
      throw new Error('Unexpected error');
    });

    const { fetchPaymentSchedule } = usePaymentScheduleStore.getState();

    const fetchPromise = fetchPaymentSchedule('3');

    await fetchPromise;

    const state = usePaymentScheduleStore.getState();
    expect(state.loading).toBe(false);
    expect(state.data).toEqual([]);
    expect(state.error).toBe('An unexpected error occurred');
  });
});
