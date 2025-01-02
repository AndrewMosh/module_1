import { renderHook } from '@testing-library/react';
import { useCardColors } from './useCardColors';
import { evenColor, oddColor__aboutCards } from '@shared/UI/Card/card.consts';
import { describe, expect, it } from 'vitest';

describe('useCardColors', () => {
  it('returns oddColor__aboutCards for even cardId', () => {
    const { result } = renderHook(() => useCardColors(2));
    expect(result.current).toBe(oddColor__aboutCards);
  });

  it('returns evenColor for odd cardId', () => {
    const { result } = renderHook(() => useCardColors(3));
    expect(result.current).toBe(evenColor);
  });
});
