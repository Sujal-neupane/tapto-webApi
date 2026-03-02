import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ replace: jest.fn(), push: jest.fn(), refresh: jest.fn() }),
}));

jest.mock('@/lib/context/auth-context', () => ({
  useAuth: jest.fn(),
}));

import { useAuth } from '@/lib/context/auth-context';
import AdminRoute from '../../components/AdminRoute';
import UserRoute from '../../components/UserRoute';

const mockedUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

describe('AdminRoute', () => {
  it('shows loading when auth is loading', () => {
    mockedUseAuth.mockReturnValue({
      user: null, token: null, isLoading: true, isAuthenticated: false, isAdmin: false,
      setUser: jest.fn(), setToken: jest.fn(), logout: jest.fn(), refreshUser: jest.fn(),
    });
    render(<AdminRoute><div>Admin Content</div></AdminRoute>);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows loading when user is not admin', () => {
    mockedUseAuth.mockReturnValue({
      user: { _id: '1', email: 'u@test.com', fullName: 'User', role: 'user' },
      token: 'tok', isLoading: false, isAuthenticated: true, isAdmin: false,
      setUser: jest.fn(), setToken: jest.fn(), logout: jest.fn(), refreshUser: jest.fn(),
    });
    render(<AdminRoute><div>Admin Content</div></AdminRoute>);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders children when user is admin', () => {
    mockedUseAuth.mockReturnValue({
      user: { _id: '1', email: 'a@test.com', fullName: 'Admin', role: 'admin' },
      token: 'tok', isLoading: false, isAuthenticated: true, isAdmin: true,
      setUser: jest.fn(), setToken: jest.fn(), logout: jest.fn(), refreshUser: jest.fn(),
    });
    render(<AdminRoute><div>Admin Content</div></AdminRoute>);
    expect(screen.getByText('Admin Content')).toBeInTheDocument();
  });
});

describe('UserRoute', () => {
  it('shows loading when auth is loading', () => {
    mockedUseAuth.mockReturnValue({
      user: null, token: null, isLoading: true, isAuthenticated: false, isAdmin: false,
      setUser: jest.fn(), setToken: jest.fn(), logout: jest.fn(), refreshUser: jest.fn(),
    });
    render(<UserRoute><div>User Content</div></UserRoute>);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders children when user is authenticated', () => {
    mockedUseAuth.mockReturnValue({
      user: { _id: '1', email: 'u@test.com', fullName: 'User', role: 'user' },
      token: 'tok', isLoading: false, isAuthenticated: true, isAdmin: false,
      setUser: jest.fn(), setToken: jest.fn(), logout: jest.fn(), refreshUser: jest.fn(),
    });
    render(<UserRoute><div>User Content</div></UserRoute>);
    expect(screen.getByText('User Content')).toBeInTheDocument();
  });
});
