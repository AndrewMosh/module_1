import { act, renderHook } from '@testing-library/react';
import usePagination from './usePagination';
import { describe, expect, it } from 'vitest';

describe('usePagination', () => {
  it('should initialize with the correct initialIndex', () => {
    const { result } = renderHook(() => usePagination(2, 5));

    expect(result.current.currentIndex).toBe(2);
  });

  it('should increment currentIndex on handleNext', () => {
    const { result } = renderHook(() => usePagination(2, 5));

    act(() => {
      result.current.handleNext();
    });

    expect(result.current.currentIndex).toBe(3);
  });

  it('should not increment currentIndex if at maxIndex', () => {
    const { result } = renderHook(() => usePagination(5, 5));

    act(() => {
      result.current.handleNext();
    });

    expect(result.current.currentIndex).toBe(5);
  });

  it('should decrement currentIndex on handlePrev', () => {
    const { result } = renderHook(() => usePagination(2, 5));

    act(() => {
      result.current.handlePrev();
    });

    expect(result.current.currentIndex).toBe(1);
  });

  it('should not decrement currentIndex if at 0', () => {
    const { result } = renderHook(() => usePagination(0, 5));

    act(() => {
      result.current.handlePrev();
    });

    expect(result.current.currentIndex).toBe(0);
  });
});
