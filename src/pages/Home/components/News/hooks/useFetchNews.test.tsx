import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import useFetchNews from './useFetchNews';
import { useNewsStore } from '@store';
import { UPDATE_INTERVAL } from '@pages/Home/components/ExchangeRates/currency.consts';

vi.mock('@store', () => ({
  useNewsStore: vi.fn(),
}));

describe('useFetchNews', () => {
  const mockFetchNews = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
    (useNewsStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      fetchNews: mockFetchNews,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('calls fetchNews immediately and sets up an interval', () => {
    renderHook(() => useFetchNews());

    expect(mockFetchNews).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(UPDATE_INTERVAL);
    expect(mockFetchNews).toHaveBeenCalledTimes(2);

    vi.advanceTimersByTime(UPDATE_INTERVAL);
    expect(mockFetchNews).toHaveBeenCalledTimes(3);
  });

  it('clears the interval on unmount', () => {
    const { unmount } = renderHook(() => useFetchNews());

    expect(mockFetchNews).toHaveBeenCalledTimes(1);

    unmount();

    vi.advanceTimersByTime(UPDATE_INTERVAL);
    expect(mockFetchNews).toHaveBeenCalledTimes(1);
  });
});
