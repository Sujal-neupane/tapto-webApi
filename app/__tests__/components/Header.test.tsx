import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), refresh: jest.fn() }),
}));

jest.mock('@/lib/context/auth-context', () => ({
  useAuth: () => ({
    user: { _id: '1', fullName: 'Test User', email: 'test@test.com', role: 'user' },
    isAuthenticated: true,
    isAdmin: false,
    logout: jest.fn(),
  }),
}));

jest.mock('cookies-next', () => ({
  setCookie: jest.fn(),
  deleteCookie: jest.fn(),
  getCookie: jest.fn(),
}));

jest.mock('@/lib/actions/auth-action', () => ({
  handleLogout: jest.fn().mockResolvedValue({ success: true }),
}));

import LogoutButton from '../../_components/logout-button';

describe('LogoutButton rendering', () => {
  it('renders as a button element', () => {
    render(<LogoutButton />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('displays default Logout text', () => {
    render(<LogoutButton />);
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('renders custom children', () => {
    render(<LogoutButton>Sign Out Now</LogoutButton>);
    expect(screen.getByText('Sign Out Now')).toBeInTheDocument();
  });

  it('is accessible by role', () => {
    render(<LogoutButton />);
    const btn = screen.getByRole('button');
    expect(btn).toBeDefined();
  });
});
