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

jest.mock('@/lib/api/orders', () => ({
  getUserOrders: jest.fn().mockResolvedValue({ data: { orders: [] } }),
  updateOrderStatus: jest.fn().mockResolvedValue({ data: {} }),
}));

jest.mock('lucide-react', () => ({
  Package: () => <div data-testid="package-icon" />,
  Search: () => <div data-testid="search-icon" />,
  Filter: () => <div data-testid="filter-icon" />,
  ChevronDown: () => <div data-testid="chevron-down" />,
  X: () => <div data-testid="x-icon" />,
  Clock: () => <div data-testid="clock-icon" />,
  CheckCircle: () => <div data-testid="check-icon" />,
  XCircle: () => <div data-testid="x-circle-icon" />,
  Truck: () => <div data-testid="truck-icon" />,
  ShoppingBag: () => <div data-testid="bag-icon" />,
  ArrowLeft: () => <div data-testid="arrow-left" />,
}));

jest.mock('cookies-next', () => ({
  setCookie: jest.fn(),
  deleteCookie: jest.fn(),
  getCookie: jest.fn(),
}));

import OrdersPage from '../../user/orders/page';

describe('OrdersPage', () => {
  it('renders orders heading', async () => {
    await act(async () => {
      render(<OrdersPage />);
    });
    expect(screen.getByText(/Orders/i)).toBeInTheDocument();
  });

  it('shows filter options', async () => {
    await act(async () => {
      render(<OrdersPage />);
    });
    expect(screen.getByText(/All/i)).toBeInTheDocument();
  });
});
