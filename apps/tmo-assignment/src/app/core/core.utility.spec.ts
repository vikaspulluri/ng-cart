import { randomKey, trackByFn } from './core.utility';

describe('Core utility', () => {
  it('should generate random string', () => {
    expect(randomKey()).toMatch('ORDER-');
  });

  it('should return identifier', () => {
    expect(trackByFn(0, { id: 1 })).toBe(1);
    expect(trackByFn(2, { id: null })).toBe(2);
  });
});
