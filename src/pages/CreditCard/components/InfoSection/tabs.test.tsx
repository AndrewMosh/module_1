import { describe, it, expect } from 'vitest';
import { tabs } from './tabs.consts';

describe('tabs configuration', () => {
  it('should have the correct number of tabs', () => {
    expect(tabs).toHaveLength(4);
  });

  it('should have the correct labels', () => {
    const labels = tabs.map((tab) => tab.label);
    expect(labels).toEqual([
      'About card',
      'Rates and conditions',
      'Cashback',
      'FAQ',
    ]); 
  });
});
