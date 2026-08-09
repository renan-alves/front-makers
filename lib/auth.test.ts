import { describe, it, expect } from 'vitest';
import { hashPassword, verifyPassword, isStrongPassword } from './auth';

describe('hashPassword / verifyPassword', () => {
  it('produces a salt:hash formatted string', () => {
    const hash = hashPassword('Sup3r$ecret');
    expect(hash).toMatch(/^[0-9a-f]{32}:[0-9a-f]{128}$/);
  });

  it('generates a different hash each time (random salt)', () => {
    const a = hashPassword('Sup3r$ecret');
    const b = hashPassword('Sup3r$ecret');
    expect(a).not.toBe(b);
  });

  it('verifies the correct password against its hash', () => {
    const hash = hashPassword('Sup3r$ecret');
    expect(verifyPassword('Sup3r$ecret', hash)).toBe(true);
  });

  it('rejects an incorrect password', () => {
    const hash = hashPassword('Sup3r$ecret');
    expect(verifyPassword('wrong-password', hash)).toBe(false);
  });

  it('rejects a malformed stored hash', () => {
    expect(verifyPassword('Sup3r$ecret', 'not-a-valid-hash')).toBe(false);
    expect(verifyPassword('Sup3r$ecret', '')).toBe(false);
  });

  it('rejects when the stored hash has a different length than the derived key', () => {
    const salt = hashPassword('x').split(':')[0];
    expect(verifyPassword('Sup3r$ecret', `${salt}:deadbeef`)).toBe(false);
  });
});

describe('isStrongPassword', () => {
  it('accepts a password with lower, upper, number and symbol (>=8 chars)', () => {
    expect(isStrongPassword('Abcdef1!')).toBe(true);
  });

  it('rejects passwords shorter than 8 characters', () => {
    expect(isStrongPassword('Ab1!')).toBe(false);
  });

  it('rejects passwords missing an uppercase letter', () => {
    expect(isStrongPassword('abcdef1!')).toBe(false);
  });

  it('rejects passwords missing a lowercase letter', () => {
    expect(isStrongPassword('ABCDEF1!')).toBe(false);
  });

  it('rejects passwords missing a number', () => {
    expect(isStrongPassword('Abcdefg!')).toBe(false);
  });

  it('rejects passwords missing a symbol', () => {
    expect(isStrongPassword('Abcdefg1')).toBe(false);
  });
});
