import { renderHook, act } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import useSubscription from './useSubscription';
import { useSubscriptionStore } from '@store';

vi.mock('@store', () => ({
  useSubscriptionStore: vi.fn(),
}));

describe('useSubscription', () => {
  const mockSubscribe = vi.fn();
  const mockIsSubscribed = false;

  beforeEach(() => {
    vi.clearAllMocks();

    (
      useSubscriptionStore as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      isSubscribed: mockIsSubscribed,
      subscribe: mockSubscribe,
    });
  });

  it('returns initial state correctly', () => {
    const { result } = renderHook(() => useSubscription());

    expect(result.current.isSubscribed).toBe(false);
    expect(result.current.isSubmitting).toBe(false);
    expect(typeof result.current.handleSubscribe).toBe('function');
  });

  it('handles subscription successfully', async () => {
    mockSubscribe.mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useSubscription());

    await act(async () => {
      await result.current.handleSubscribe('test@example.com');
    });

    expect(mockSubscribe).toHaveBeenCalledWith('test@example.com');
    expect(result.current.isSubmitting).toBe(false);
  });

  it('handles subscription error', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const mockError = new Error('Subscription failed');
    mockSubscribe.mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useSubscription());

    await act(async () => {
      await result.current.handleSubscribe('test@example.com');
    });

    expect(mockSubscribe).toHaveBeenCalledWith('test@example.com');
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Subscription error:',
      mockError,
    );
    expect(result.current.isSubmitting).toBe(false);

    consoleErrorSpy.mockRestore();
  });

  it('sets isSubmitting state correctly', async () => {
    mockSubscribe.mockImplementationOnce(
      () =>
        new Promise((resolve) => setTimeout(() => resolve(undefined), 1000)),
    );

    const { result } = renderHook(() => useSubscription());

    act(() => {
      result.current.handleSubscribe('test@example.com');
    });

    expect(result.current.isSubmitting).toBe(true);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    expect(result.current.isSubmitting).toBe(false);
  });
});
