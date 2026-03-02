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

jest.mock('lucide-react', () => ({
  Settings: () => <div data-testid="settings-icon" />,
  Lock: () => <div data-testid="lock-icon" />,
  Trash2: () => <div data-testid="trash-icon" />,
  Bell: () => <div data-testid="bell-icon" />,
  Palette: () => <div data-testid="palette-icon" />,
  Shield: () => <div data-testid="shield-icon" />,
  User: () => <div data-testid="user-icon" />,
  X: () => <div data-testid="x-icon" />,
  Eye: () => <div data-testid="eye-icon" />,
  EyeOff: () => <div data-testid="eye-off-icon" />,
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
    expect(screen.getByText(/Settings/i)).toBeInTheDocument();
  });

  it('shows user info section', async () => {
    await act(async () => {
      render(<SettingsPage />);
    });
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });

  it('shows security section', async () => {
    await act(async () => {
      render(<SettingsPage />);
    });
    expect(screen.getByText(/Change Password/i)).toBeInTheDocument();
  });

  it('shows delete account option', async () => {
    await act(async () => {
      render(<SettingsPage />);
    });
    expect(screen.getByText(/Delete Account/i)).toBeInTheDocument();
  });
});
