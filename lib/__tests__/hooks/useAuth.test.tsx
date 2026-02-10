import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, useAuth } from '../../context/auth-context';

jest.mock('../../api/auth', () => ({
  getStoredUser: jest.fn(() => ({
    _id: '1',
    email: 'admin@test.com',
    fullName: 'Admin User',
    role: 'admin',
    phoneNumber: '+9779841234567',
  })),
  getAuthToken: jest.fn(() => 'fake-token'),
  logout: jest.fn(),
}));

jest.mock('cookies-next', () => ({
  setCookie: jest.fn(),
  deleteCookie: jest.fn(),
  getCookie: jest.fn(),
}));

function TestComponent() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  return (
    <div>
      <span data-testid="name">{user?.fullName || 'none'}</span>
      <span data-testid="auth">{String(isAuthenticated)}</span>
      <span data-testid="admin">{String(isAdmin)}</span>
      <button data-testid="logout-btn" onClick={logout}>Logout</button>
    </div>
  );
}

describe('useAuth with stored user', () => {
  it('loads stored user on mount', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    await act(async () => {});
    expect(screen.getByTestId('name').textContent).toBe('Admin User');
  });

  it('shows authenticated state', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    await act(async () => {});
    expect(screen.getByTestId('auth').textContent).toBe('true');
  });

  it('detects admin role', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    await act(async () => {});
    expect(screen.getByTestId('admin').textContent).toBe('true');
  });

  it('clears user on logout', async () => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    await act(async () => {});
    await user.click(screen.getByTestId('logout-btn'));
    expect(screen.getByTestId('name').textContent).toBe('none');
  });
});
