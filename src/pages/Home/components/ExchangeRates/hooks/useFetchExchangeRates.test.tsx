import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import useFetchExchangeRates from './useFetchExchangeRates';
import { useCurrencyStore } from '@store';

vi.mock('@store', () => ({
  useCurrencyStore: vi.fn(),
}));

describe('useFetchExchangeRates', () => {
  const mockFetchRates = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
    (useCurrencyStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      fetchRates: mockFetchRates,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('calls fetchRates immediately and sets up an interval', () => {
    const baseCurrency = 'USD';
    const requiredCurrencies = ['EUR', 'GBP'];
    const updateInterval = 1000;

    renderHook(() =>
      useFetchExchangeRates(baseCurrency, requiredCurrencies, updateInterval),
    );

    expect(mockFetchRates).toHaveBeenCalledWith(
      baseCurrency,
      requiredCurrencies,
    );

    expect(mockFetchRates).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(1000);
    expect(mockFetchRates).toHaveBeenCalledTimes(2);

    vi.advanceTimersByTime(2000);
    expect(mockFetchRates).toHaveBeenCalledTimes(4);
  });

  it('clears the interval on unmount', () => {
    const baseCurrency = 'USD';
    const requiredCurrencies = ['EUR', 'GBP'];
    const updateInterval = 1000;

    const { unmount } = renderHook(() =>
      useFetchExchangeRates(baseCurrency, requiredCurrencies, updateInterval),
    );

    expect(mockFetchRates).toHaveBeenCalledWith(
      baseCurrency,
      requiredCurrencies,
    );

    unmount();

    vi.advanceTimersByTime(3000);
    expect(mockFetchRates).toHaveBeenCalledTimes(1);
  });
});
