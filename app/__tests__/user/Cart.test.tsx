import React from 'react';
import { render, screen, act } from '@testing-library/react';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush, refresh: jest.fn() }),
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
    name: 'Test Product',
    price: 29.99,
    images: ['test.jpg'],
    description: 'A test product',
  }),
}));

jest.mock('lucide-react', () => ({
  ShoppingCart: () => <div data-testid="cart-icon" />,
  Trash2: () => <div data-testid="trash-icon" />,
  Plus: () => <div data-testid="plus-icon" />,
  Minus: () => <div data-testid="minus-icon" />,
  ArrowLeft: () => <div data-testid="arrow-left" />,
  Tag: () => <div data-testid="tag-icon" />,
  ShoppingBag: () => <div data-testid="bag-icon" />,
  Heart: () => <div data-testid="heart-icon" />,
  X: () => <div data-testid="x-icon" />,
}));

jest.mock('cookies-next', () => ({
  setCookie: jest.fn(),
  deleteCookie: jest.fn(),
  getCookie: jest.fn(),
}));

import CartPage from '../../user/cart/page';

describe('CartPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Storage.prototype.getItem = jest.fn(() => JSON.stringify([]));
    Storage.prototype.setItem = jest.fn();
  });

  it('renders cart page heading', async () => {
    await act(async () => {
      render(<CartPage />);
    });
    expect(screen.getByText(/Shopping Cart/i)).toBeInTheDocument();
  });

  it('shows empty cart message when no items', async () => {
    await act(async () => {
      render(<CartPage />);
    });
    expect(screen.getByText(/empty/i)).toBeInTheDocument();
  });

  it('reads cart from localStorage on mount', async () => {
    await act(async () => {
      render(<CartPage />);
    });
    expect(localStorage.getItem).toHaveBeenCalledWith('cart');
  });
});
