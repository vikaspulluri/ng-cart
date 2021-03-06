import {
  booksFeatureKey,
  cartFeatureKey,
  searchFeatureKey,
  orderFeatureKey,
} from './shared.constants';

export interface NavItem {
  id: string;
  icon: string;
  label: string;
  notificationCount?: number;
  path: string;
}

export const navItems: NavItem[] = [
  {
    id: 'home',
    icon: 'home',
    label: 'Home',
    path: '',
  },
  {
    id: searchFeatureKey,
    icon: 'search',
    label: 'Search',
    path: '/books',
  },
  {
    id: cartFeatureKey,
    icon: 'shopping_cart',
    label: 'Cart',
    path: '/cart',
  },
  {
    id: orderFeatureKey,
    icon: 'library_books',
    label: 'My Collection',
    path: '/orders',
  },
];
