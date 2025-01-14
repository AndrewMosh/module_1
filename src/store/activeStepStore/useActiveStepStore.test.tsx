import { describe, it, expect, beforeEach } from 'vitest';
import {
  removeActiveStep,
  setActiveStep,
  useActiveStepStore,
} from './useActiveStepStore';

describe('useActiveStepStore', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should set activeStep and update localStorage', () => {
    setActiveStep(5);
    const { activeStep } = useActiveStepStore.getState();
    expect(activeStep).toBe(5);
    expect(localStorage.getItem('activeStep')).toBe('5');
  });

  it('should remove activeStep and clear localStorage', () => {
    setActiveStep(2);
    removeActiveStep();
    const { activeStep } = useActiveStepStore.getState();
    expect(activeStep).toBe(0);
    expect(localStorage.getItem('activeStep')).toBeNull();
  });
});
