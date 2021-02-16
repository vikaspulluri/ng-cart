import { Book } from '../book/book.model';
import { CartItem } from '../cart/cart.model';

export function trackByFn(index: number, item: any): string | number {
  return item.id || index;
}

export function randomKey(prefix = 'Order-'): string {
  return (prefix + Math.random().toString(36).substring(7)).toUpperCase();
}

export function mapQuantityWithObject(
  items: { quantity: number; product: CartItem | Book }[]
): { [key: string]: number } {
  const obj: { [key: string]: number } = {};
  items.forEach((item) => {
    if (item?.product?.id) {
      obj[item.product.id] = item.quantity;
    }
  });
  return obj;
}
