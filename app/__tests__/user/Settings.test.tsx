import React from 'react';
import { render, screen, act } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), refresh: jest.fn() }),
}));

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
    logout: jest.fn(),
  }),
}));

jest.mock('@/lib/api/axios', () => ({
  __esModule: true,
  default: {
    put: jest.fn().mockResolvedValue({ data: { success: true } }),
    delete: jest.fn().mockResolvedValue({ data: { success: true } }),
  },
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

import SettingsPage from '../../user/settings/page';

describe('SettingsPage', () => {
  it('renders settings page heading', async () => {
    await act(async () => {
      render(<SettingsPage />);
    });
    expect(screen.getByRole('heading', { name: /Settings/i })).toBeInTheDocument();
  }, 10000);

  it('shows user info section', async () => {
    await act(async () => {
      render(<SettingsPage />);
    });
    expect(screen.getByText(/Profile Settings/i)).toBeInTheDocument();
  }, 10000);

  it('shows security section', async () => {
    await act(async () => {
      render(<SettingsPage />);
    });
    expect(screen.getByText(/Change Password/i)).toBeInTheDocument();
  }, 10000);

  it('shows delete account option', async () => {
    await act(async () => {
      render(<SettingsPage />);
    });
    expect(screen.getByText(/Delete Account/i)).toBeInTheDocument();
  }, 10000);
});
