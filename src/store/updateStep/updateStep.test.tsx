import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useStepStore } from './useStepStore';

describe('useStepStore', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('should update step in localStorage', () => {
    const { updateStep } = useStepStore.getState();
    updateStep('testKey', 'step1');

    const storedData = localStorage.getItem('testKey');
    expect(storedData).toBeDefined();
    const parsedData = JSON.parse(storedData as string);
    expect(parsedData.step1).toBe(true);
  });

  it('should handle non-existing key in localStorage', () => {
    const { updateStep } = useStepStore.getState();
    updateStep('nonExistingKey', 'step2');

    const storedData = localStorage.getItem('nonExistingKey');
    expect(storedData).toBeDefined();
    const parsedData = JSON.parse(storedData as string);
    expect(parsedData.step2).toBe(true);
  });

  it('should log error if localStorage operation fails', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');
    const { updateStep } = useStepStore.getState();

    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Mocked error');
    });

    updateStep('testKey', 'step3');
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error updating step:',
      expect.any(Error),
    );
  });
});
