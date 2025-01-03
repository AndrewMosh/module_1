import { describe, it, expect } from 'vitest';
import { useAgreementStore } from './useAgreementStore';

describe('useAgreementStore', () => {
  it('should initialize with isAgreed as false', () => {
    const { isAgreed } = useAgreementStore.getState();
    expect(isAgreed).toBe(false);
  });

  it('should update isAgreed when setAgreement is called', () => {
    const store = useAgreementStore;
    store.getState().setAgreement(true);
    expect(store.getState().isAgreed).toBe(true);
    store.setState({ isAgreed: false });
  });
});
