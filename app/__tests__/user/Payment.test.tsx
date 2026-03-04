import React from 'react';
import { render, screen, act } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), refresh: jest.fn() }),
}));

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
    paymentMethods: ['Credit Card', 'PayPal'],
  }),
}));

jest.mock('@/lib/api/orders', () => ({
  getMyOrders: jest.fn().mockResolvedValue([]),
  cancelOrder: jest.fn().mockResolvedValue({}),
}));
jest.mock('@/app/_components/logout-button', () => ({
  __esModule: true,
  default: function MockLogoutButton({ children, className }: any) {
    return <button className={className}>{children || 'Logout'}</button>;
  },
}));
jest.mock('cookies-next', () => ({
  setCookie: jest.fn(),
  deleteCookie: jest.fn(),
  getCookie: jest.fn(),
}));

import PaymentPage from '../../user/payments/page';

describe('PaymentPage', () => {
  it('renders payment methods heading', async () => {
    await act(async () => {
      render(<PaymentPage />);
    });
    expect(screen.getByRole('heading', { name: /Payment Methods/i })).toBeInTheDocument();
  });

  it('shows add payment method button', async () => {
    await act(async () => {
      render(<PaymentPage />);
    });
    expect(screen.getByText(/Add.*Payment/i)).toBeInTheDocument();
  });

  it('displays existing payment methods', async () => {
    await act(async () => {
      render(<PaymentPage />);
    });
    expect(screen.getByText(/Visa/i)).toBeInTheDocument();
  });
});
