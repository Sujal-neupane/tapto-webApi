import React from 'react';
import { render, screen, act } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), refresh: jest.fn() }),
}));

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

jest.mock('next/image', () => {
  return ({ src, alt }: any) => <img src={src} alt={alt} />;
});

jest.mock('@/lib/context/auth-context', () => ({
  useAuth: () => ({
    user: { _id: '1', fullName: 'Test User', email: 'test@test.com', role: 'user' },
    isAuthenticated: true,
    isLoading: false,
    token: 'test-token',
  }),
}));

jest.mock('@/lib/hooks/useCurrency', () => ({
  useCurrency: () => ({
    currency: { code: 'USD', symbol: '$', rate: 1 },
    format: (price: number) => '$' + price.toFixed(2),
    paymentMethods: ['Credit Card'],
  }),
}));

jest.mock('@/lib/api/products', () => ({
  getProductById: jest.fn().mockResolvedValue({
    _id: 'p1',
    name: 'Wishlist Product',
    price: 49.99,
    images: ['test.jpg'],
  }),
}));

jest.mock('lucide-react', () => ({
  Heart: () => <div data-testid="heart-icon" />,
  ShoppingCart: () => <div data-testid="cart-icon" />,
  Trash2: () => <div data-testid="trash-icon" />,
  ArrowLeft: () => <div data-testid="arrow-left" />,
  ShoppingBag: () => <div data-testid="bag-icon" />,
  X: () => <div data-testid="x-icon" />,
}));

jest.mock('cookies-next', () => ({
  setCookie: jest.fn(),
  deleteCookie: jest.fn(),
  getCookie: jest.fn(),
}));

import WishlistPage from '../../user/wishlist/page';

describe('WishlistPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Storage.prototype.getItem = jest.fn(() => JSON.stringify([]));
    Storage.prototype.setItem = jest.fn();
  });

  it('renders wishlist heading', async () => {
    await act(async () => {
      render(<WishlistPage />);
    });
    expect(screen.getByRole('heading', { name: /My Wishlist/i })).toBeInTheDocument();
  });

  it('shows empty state when no items', async () => {
    await act(async () => {
      render(<WishlistPage />);
    });
    expect(screen.getByText(/empty/i)).toBeInTheDocument();
  });

  it('reads wishlist from localStorage', async () => {
    await act(async () => {
      render(<WishlistPage />);
    });
    expect(localStorage.getItem).toHaveBeenCalledWith('wishlist');
  });
});
