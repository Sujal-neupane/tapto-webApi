import React from 'react';
import { render, screen, act } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), refresh: jest.fn() }),
}));

jest.mock('@/lib/context/auth-context', () => ({
  useAuth: () => ({
    user: { _id: '1', fullName: 'Test User', email: 'test@test.com', role: 'user' },
    isAuthenticated: true,
    isLoading: false,
    token: 'test-token',
  }),
}));

jest.mock('@/lib/api/addresses', () => ({
  __esModule: true,
  getUserAddresses: jest.fn().mockResolvedValue([]),
  createAddress: jest.fn().mockResolvedValue({ _id: 'a1' }),
  updateAddress: jest.fn().mockResolvedValue({}),
  deleteAddress: jest.fn().mockResolvedValue({}),
  setDefaultAddress: jest.fn().mockResolvedValue({}),
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

import AddressesPage from '../../user/addresses/page';

describe('AddressesPage', () => {
  it('renders addresses heading', async () => {
    await act(async () => {
      render(<AddressesPage />);
    });
    expect(screen.getByRole('heading', { name: /Address/i })).toBeInTheDocument();
  }, 20000);

  it('shows add address button', async () => {
    await act(async () => {
      render(<AddressesPage />);
    });
    expect(screen.getByText(/Add.*Address/i)).toBeInTheDocument();
  }, 20000);
});
