import { isOlderThan18 } from '@utils';
import { describe, expect, it } from 'vitest';

describe('isOlderThan18', () => {
  it('returns true for a date that makes the person 18 years or older', () => {
    expect(isOlderThan18('01.01.2005')).toBe(true);
  });

  it('returns false for a date that makes the person younger than 18 years', () => {
    expect(isOlderThan18('31.12.2009')).toBe(false);
  });

  it('returns false for invalid date strings', () => {
    expect(isOlderThan18('invalid-date')).toBe(false);
    expect(isOlderThan18('32.01.2005')).toBe(false);
    expect(isOlderThan18('01.13.2005')).toBe(false);
    expect(isOlderThan18('2005/01/14')).toBe(false);
  });

  it('handles edge cases correctly', () => {
    const today = new Date();
    const year = today.getFullYear() - 18;
    const month = today.getMonth() + 1;
    const day = today.getDate();

    const isoDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dotDate = `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.${year}`;

    expect(isOlderThan18(isoDate)).toBe(true);
    expect(isOlderThan18(dotDate)).toBe(true);
  });
});
