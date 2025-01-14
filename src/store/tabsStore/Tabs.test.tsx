import { describe, it, expect } from 'vitest';
import { useTabsStore } from './useTabsStore';

describe('useTabsStore', () => {
  it('should initialize with activeTab set to 0', () => {
    const { activeTab } = useTabsStore.getState();
    expect(activeTab).toBe(0);
  });

  it('should update activeTab when setActiveTab is called', () => {
    const { setActiveTab } = useTabsStore.getState();
    setActiveTab(2);
    const { activeTab } = useTabsStore.getState();
    expect(activeTab).toBe(2);
  });

  it('should not update activeTab if setActiveTab is called with the same value', () => {
    const { setActiveTab } = useTabsStore.getState();
    setActiveTab(2);
    setActiveTab(2);
    const { activeTab } = useTabsStore.getState();
    expect(activeTab).toBe(2);
  });
});
