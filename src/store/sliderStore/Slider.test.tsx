import { describe, it, expect } from 'vitest';
import { useSliderStore } from './useSliderStore';

describe('useSliderStore', () => {
  it('should initialize with default value', () => {
    const { value } = useSliderStore.getState();
    expect(value).toBe(150000);
  });

  it('should update the value', () => {
    const { setValue } = useSliderStore.getState();
    setValue(200000);
    const { value } = useSliderStore.getState();
    expect(value).toBe(200000);
  });
});
