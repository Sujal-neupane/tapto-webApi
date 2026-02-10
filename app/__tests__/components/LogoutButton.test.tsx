import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LogoutButton from '../../_components/logout-button';

const mockPush = jest.fn();
const mockRefresh = jest.fn();
const mockLogout = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush, refresh: mockRefresh }),
}));

jest.mock('@/lib/actions/auth-action', () => ({
  handleLogout: jest.fn().mockResolvedValue({ success: true }),
}));

jest.mock('@/lib/context/auth-context', () => ({
  useAuth: () => ({ logout: mockLogout }),
}));

jest.mock('cookies-next', () => ({
  setCookie: jest.fn(),
  deleteCookie: jest.fn(),
  getCookie: jest.fn(),
}));

describe('LogoutButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default text', () => {
    render(<LogoutButton />);
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('renders with custom children', () => {
    render(<LogoutButton>Sign Out</LogoutButton>);
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });

  it('calls logout and redirects on click', async () => {
    const user = userEvent.setup();
    render(<LogoutButton />);
    await user.click(screen.getByText('Logout'));
    expect(mockLogout).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith('/auth/login');
  });

  it('applies custom className', () => {
    render(<LogoutButton className="custom-class" />);
    expect(screen.getByRole('button')).toHaveAttribute('class', 'custom-class');
  });
});