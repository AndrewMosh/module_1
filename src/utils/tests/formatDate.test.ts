import { formatDate } from '@utils';
import { describe, expect, it } from 'vitest';

describe('formatDate', () => {
  it('correctly formats a date', () => {
    const date = new Date(2023, 5, 10);
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe('MSC 10.06.2023');
  });

  it('adds leading zero to single digit day', () => {
    const date = new Date(2023, 5, 3);
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe('MSC 03.06.2023');
  });

  it('adds leading zero to single digit month', () => {
    const date = new Date(2023, 0, 15);
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe('MSC 15.01.2023');
  });

  it('correctly formats date with the last day of the year', () => {
    const date = new Date(2023, 11, 31);
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe('MSC 31.12.2023');
  });

  it('correctly formats a date with the first day of the year', () => {
    const date = new Date(2023, 0, 1);
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe('MSC 01.01.2023');
  });

  it('correctly handles current date', () => {
    const today = new Date();
    const formattedDate = formatDate(today);
    const expectedDate = `MSC ${today.getDate().toString().padStart(2, '0')}.${(today.getMonth() + 1).toString().padStart(2, '0')}.${today.getFullYear()}`;
    expect(formattedDate).toBe(expectedDate);
  });
});
