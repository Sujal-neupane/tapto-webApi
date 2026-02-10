import React from 'react';
import { render, screen, act } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), refresh: jest.fn() }),
  usePathname: () => '/admin/dashboard',
}));

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

jest.mock('@/lib/context/auth-context', () => ({
  useAuth: () => ({
    user: { _id: '1', fullName: 'Admin User', email: 'admin@test.com', role: 'admin' },
    isAuthenticated: true,
    isLoading: false,
    isAdmin: true,
    token: 'admin-token',
    logout: jest.fn(),
  }),
}));

jest.mock('@/lib/api/admin', () => ({
  getDashboardStats: jest.fn().mockResolvedValue({
    data: { totalUsers: 100, totalOrders: 50, totalProducts: 25, totalRevenue: 5000 },
  }),
  getAllOrders: jest.fn().mockResolvedValue({ data: { orders: [] } }),
}));

jest.mock('lucide-react', () => ({
  LayoutDashboard: () => <div data-testid="dashboard-icon" />,
  Users: () => <div data-testid="users-icon" />,
  Package: () => <div data-testid="package-icon" />,
  ShoppingCart: () => <div data-testid="cart-icon" />,
  Settings: () => <div data-testid="settings-icon" />,
  LogOut: () => <div data-testid="logout-icon" />,
  Menu: () => <div data-testid="menu-icon" />,
  X: () => <div data-testid="x-icon" />,
  ChevronDown: () => <div data-testid="chevron-down" />,
  TrendingUp: () => <div data-testid="trending-icon" />,
  DollarSign: () => <div data-testid="dollar-icon" />,
  Activity: () => <div data-testid="activity-icon" />,
  User: () => <div data-testid="user-icon" />,
  Bell: () => <div data-testid="bell-icon" />,
}));

jest.mock('cookies-next', () => ({
  setCookie: jest.fn(),
  deleteCookie: jest.fn(),
  getCookie: jest.fn(),
}));

import AdminDashboard from '../../admin/dashboard/page';

describe('AdminDashboard', () => {
  it('renders dashboard heading', async () => {
    await act(async () => {
      render(<AdminDashboard />);
    });
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  });

  it('shows admin user name', async () => {
    await act(async () => {
      render(<AdminDashboard />);
    });
    expect(screen.getByText(/Admin User/i)).toBeInTheDocument();
  });
});
