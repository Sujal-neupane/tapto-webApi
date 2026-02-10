import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../../context/auth-context';

jest.mock('../../api/auth', () => ({
  getStoredUser: jest.fn(() => null),
  getAuthToken: jest.fn(() => null),
  logout: jest.fn(),
}));

jest.mock('cookies-next', () => ({
  setCookie: jest.fn(),
  deleteCookie: jest.fn(),
  getCookie: jest.fn(),
}));

function TestConsumer() {
  const { user, isAuthenticated, isLoading, isAdmin } = useAuth();
  return (
    <div>
      <span data-testid="loading">{String(isLoading)}</span>
      <span data-testid="authenticated">{String(isAuthenticated)}</span>
      <span data-testid="admin">{String(isAdmin)}</span>
      <span data-testid="user">{user ? user.fullName : 'none'}</span>
    </div>
  );
}

describe('AuthProvider', () => {
  it('renders children', () => {
    render(
      <AuthProvider>
        <div data-testid="child">Hello</div>
      </AuthProvider>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('provides default unauthenticated state', async () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );
    await act(async () => {});
    expect(screen.getByTestId('authenticated').textContent).toBe('false');
  });

  it('provides isAdmin as false when no user', async () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );
    await act(async () => {});
    expect(screen.getByTestId('admin').textContent).toBe('false');
  });

  it('shows no user by default', async () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );
    await act(async () => {});
    expect(screen.getByTestId('user').textContent).toBe('none');
  });
});

describe('useAuth outside provider', () => {
  it('throws an error when used outside AuthProvider', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<TestConsumer />)).toThrow('useAuth must be used within an AuthProvider');
    consoleError.mockRestore();
  });
});
