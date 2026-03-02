import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('@/lib/context/auth-context', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="auth-provider">{children}</div>,
  useAuth: () => ({
    user: null, token: null, isLoading: false, isAuthenticated: false, isAdmin: false,
    setUser: jest.fn(), setToken: jest.fn(), logout: jest.fn(), refreshUser: jest.fn(),
  }),
}));

jest.mock('react-toastify', () => ({
  ToastContainer: () => <div data-testid="toast-container" />,
}));

jest.mock('cookies-next', () => ({
  setCookie: jest.fn(),
  deleteCookie: jest.fn(),
  getCookie: jest.fn(),
}));

import ClientProviders from '../_components/client-providers';

describe('ClientProviders', () => {
  it('renders children inside providers', () => {
    render(
      <ClientProviders>
        <div data-testid="child">Hello</div>
      </ClientProviders>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('includes ToastContainer', () => {
    render(
      <ClientProviders>
        <div>Test</div>
      </ClientProviders>
    );
    expect(screen.getByTestId('toast-container')).toBeInTheDocument();
  });

  it('wraps in AuthProvider', () => {
    render(
      <ClientProviders>
        <div>Test</div>
      </ClientProviders>
    );
    expect(screen.getByTestId('auth-provider')).toBeInTheDocument();
  });
});
