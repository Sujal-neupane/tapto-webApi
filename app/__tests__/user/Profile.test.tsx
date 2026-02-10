import React from 'react';
import { render, screen, act } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), refresh: jest.fn() }),
}));

jest.mock('next/image', () => {
  return ({ src, alt }: any) => <img src={src} alt={alt} data-testid="profile-image" />;
});

jest.mock('@/lib/context/auth-context', () => ({
  useAuth: () => ({
    user: {
      _id: '1',
      fullName: 'Test User',
      email: 'test@test.com',
      role: 'user',
      phoneNumber: '+9779841234567',
    },
    isAuthenticated: true,
    isLoading: false,
    token: 'test-token',
    refreshUser: jest.fn(),
  }),
}));

jest.mock('@/lib/hooks/useCurrency', () => ({
  useCurrency: () => ({
    currency: { code: 'USD', symbol: '$', rate: 1 },
    format: (price: number) => '$' + price.toFixed(2),
    paymentMethods: ['Credit Card'],
  }),
}));

jest.mock('@/lib/api/admin', () => ({
  updateUserById: jest.fn().mockResolvedValue({ data: { user: { fullName: 'Updated' } } }),
}));

jest.mock('lucide-react', () => ({
  Camera: () => <div data-testid="camera-icon" />,
  Save: () => <div data-testid="save-icon" />,
  User: () => <div data-testid="user-icon" />,
  ArrowLeft: () => <div data-testid="arrow-left" />,
  X: () => <div data-testid="x-icon" />,
}));

jest.mock('cookies-next', () => ({
  setCookie: jest.fn(),
  deleteCookie: jest.fn(),
  getCookie: jest.fn(),
}));

import ProfilePage from '../../user/profile/page';

describe('ProfilePage', () => {
  it('renders profile page', async () => {
    await act(async () => {
      render(<ProfilePage />);
    });
    expect(screen.getByText(/Profile/i)).toBeInTheDocument();
  });

  it('shows user email', async () => {
    await act(async () => {
      render(<ProfilePage />);
    });
    expect(screen.getByDisplayValue('test@test.com')).toBeInTheDocument();
  });

  it('shows user name in form', async () => {
    await act(async () => {
      render(<ProfilePage />);
    });
    expect(screen.getByDisplayValue('Test User')).toBeInTheDocument();
  });
});
