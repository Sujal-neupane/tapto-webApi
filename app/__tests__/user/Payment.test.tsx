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

jest.mock('lucide-react', () => ({
  CreditCard: () => <div data-testid="credit-card-icon" />,
  Plus: () => <div data-testid="plus-icon" />,
  Trash2: () => <div data-testid="trash-icon" />,
  Star: () => <div data-testid="star-icon" />,
  X: () => <div data-testid="x-icon" />,
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
    expect(screen.getByText(/Payment/i)).toBeInTheDocument();
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
