import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useRestoreForm } from './useRestoreForm';
import { usePrescoringStore } from '@store';

vi.mock('@store', () => ({
  usePrescoringStore: vi.fn(),
}));

describe('useRestoreForm', () => {
  it('should call restoreFormState on mount', () => {
    const mockRestoreFormState = vi.fn();
    const mockForms = { field1: 'value1', field2: 'value2' };

    (usePrescoringStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      forms: mockForms,
      restoreFormState: mockRestoreFormState,
    });

    renderHook(() => useRestoreForm());

    expect(mockRestoreFormState).toHaveBeenCalledTimes(1);
  });

  it('should set isRestored to true after restoreFormState', () => {
    const mockRestoreFormState = vi.fn();
    const mockForms = { field1: 'value1', field2: 'value2' };

    (usePrescoringStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      forms: mockForms,
      restoreFormState: mockRestoreFormState,
    });

    const { result } = renderHook(() => useRestoreForm());

    expect(result.current.isRestored).toBe(true);

    expect(result.current.forms).toEqual(mockForms);
  });
});
