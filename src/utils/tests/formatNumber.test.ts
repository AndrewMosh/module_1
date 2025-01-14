import { formatNumber } from '@utils';
import { describe, expect, it } from 'vitest';

describe('formatNumber', () => {
  it('formats a number with custom locale (en-US)', () => {
    const value = 1234567.89;
    const formattedNumber = formatNumber({ value, locale: 'en-US' });
    expect(formattedNumber).toBe('1,234,567.89');
  });

  it('formats a number with custom locale (de-DE)', () => {
    const value = 1234567.89;
    const formattedNumber = formatNumber({ value, locale: 'de-DE' });
    expect(formattedNumber).toBe('1.234.567,89');
  });

  it('formats a number with custom locale and negative value', () => {
    const value = -1234567.89;
    const formattedNumber = formatNumber({ value, locale: 'en-US' });
    expect(formattedNumber).toBe('-1,234,567.89');
  });

  it('formats zero correctly', () => {
    const value = 0;
    const formattedNumber = formatNumber({ value });
    expect(formattedNumber).toBe('0');
  });
});
