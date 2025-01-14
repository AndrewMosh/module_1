import { describe, it, expect, vi, beforeEach, Mocked } from 'vitest';
import axios from 'axios';
import { useSubscriptionStore } from './useSubscriptionStore';
import { act, renderHook } from '@testing-library/react';

vi.mock('axios');
const mockedAxios = axios as Mocked<typeof axios>;

describe('useSubscriptionStore', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with the correct subscription state', () => {
    const { result } = renderHook(() => useSubscriptionStore());
    expect(result.current.isSubscribed).toBe(false);
  });

  it('should set isSubscribed to true and update localStorage on successful subscription', async () => {
    mockedAxios.post.mockResolvedValue({ status: 200 });

    const { result } = renderHook(() => useSubscriptionStore());
    await act(async () => {
      await result.current.subscribe('test@example.com');
    });

    expect(result.current.isSubscribed).toBe(true);
    expect(localStorage.getItem('isSubscribed')).toBe('true');
  });
});
