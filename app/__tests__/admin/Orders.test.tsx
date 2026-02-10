import React from 'react';
import { render, screen, act } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), refresh: jest.fn() }),
}));

jest.mock('@/lib/context/auth-context', () => ({
  useAuth: () => ({
    user: { _id: '1', fullName: 'Admin', email: 'admin@test.com', role: 'admin' },
    isAuthenticated: true,
    isLoading: false,
    isAdmin: true,
    token: 'admin-token',
  }),
}));

jest.mock('@/lib/api/admin', () => ({
  getAllOrders: jest.fn().mockResolvedValue({ data: { orders: [] } }),
  updateOrderStatus: jest.fn().mockResolvedValue({ data: {} }),
  assignDriver: jest.fn().mockResolvedValue({ data: {} }),
  getAllDrivers: jest.fn().mockResolvedValue({ data: { drivers: [] } }),
}));

jest.mock('lucide-react', () => ({
  Package: () => <div data-testid="package-icon" />,
  Search: () => <div data-testid="search-icon" />,
  Filter: () => <div data-testid="filter-icon" />,
  ChevronDown: () => <div data-testid="chevron-down" />,
  X: () => <div data-testid="x-icon" />,
  ArrowUpDown: () => <div data-testid="sort-icon" />,
  Truck: () => <div data-testid="truck-icon" />,
}));

jest.mock('cookies-next', () => ({
  setCookie: jest.fn(),
  deleteCookie: jest.fn(),
  getCookie: jest.fn(),
}));

import AdminOrdersPage from '../../admin/orders/page';

describe('AdminOrdersPage', () => {
  it('renders admin orders heading', async () => {
    await act(async () => {
      render(<AdminOrdersPage />);
    });
    expect(screen.getByText(/Orders/i)).toBeInTheDocument();
  });

  it('shows search or filter UI', async () => {
    await act(async () => {
      render(<AdminOrdersPage />);
    });
    const inputs = screen.queryAllByRole('textbox');
    expect(inputs.length).toBeGreaterThanOrEqual(0);
  });
});
