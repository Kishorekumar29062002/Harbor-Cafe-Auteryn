import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { formatDueDate } from '../src/formatDueDate.js';

describe('formatDueDate', () => {
  it('formats a standard Date object into YYYY-MM-DD', () => {
    const date = new Date(2026, 10, 12); // Month is 0-indexed: 10 -> November
    assert.strictEqual(formatDueDate(date), '2026-11-12');
  });

  it('pads single-digit month and day with leading zeroes', () => {
    const date = new Date(2026, 0, 5); // January 5, 2026
    assert.strictEqual(formatDueDate(date), '2026-01-05');
  });

  it('formats a leap-year date correctly', () => {
    const leapDate = new Date(2024, 1, 29); // February 29, 2024
    assert.strictEqual(formatDueDate(leapDate), '2024-02-29');
  });

  it('formats end of year date correctly', () => {
    const yearEnd = new Date(2026, 11, 31); // December 31, 2026
    assert.strictEqual(formatDueDate(yearEnd), '2026-12-31');
  });

  it('accepts a numeric timestamp', () => {
    const date = new Date(2026, 5, 15);
    assert.strictEqual(formatDueDate(date.getTime()), '2026-06-15');
  });

  it('throws a TypeError when given an invalid date string', () => {
    assert.throws(
      () => formatDueDate('not-a-valid-date'),
      {
        name: 'TypeError',
        message: 'Invalid date: provided input cannot be parsed into a valid Date.'
      }
    );
  });

  it('throws a TypeError when given an Invalid Date object', () => {
    assert.throws(
      () => formatDueDate(new Date('invalid')),
      {
        name: 'TypeError',
        message: 'Invalid date: provided input cannot be parsed into a valid Date.'
      }
    );
  });
});
