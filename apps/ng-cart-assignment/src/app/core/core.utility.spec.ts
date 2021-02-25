import { mockBooks } from '../../test/mocks';
import { mapQuantityWithObject, randomKey, trackByFn } from './core.utility';

describe('Core utility', () => {
  it('should generate random string', () => {
    expect(randomKey()).toMatch('ORDER-');
  });

  it('should return identifier', () => {
    expect(trackByFn(0, { id: 1 })).toBe(1);
    expect(trackByFn(2, { id: null })).toBe(2);
  });

  it('should not map quantity with object', () => {
    const items = [
      {
        quantity: 1,
        product: {...mockBooks[0], id: ''},
      },
    ];
    const quantityMap = mapQuantityWithObject(items);
    expect(quantityMap).toBeTruthy();
  });
});
