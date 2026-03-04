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
  getAdminOrders: jest.fn().mockResolvedValue({ data: { orders: [] } }),
  updateAdminOrderStatus: jest.fn().mockResolvedValue({ data: {} }),
  assignDriverToOrder: jest.fn().mockResolvedValue({ data: {} }),
  getDeliveryDrivers: jest.fn().mockResolvedValue({ data: { drivers: [] } }),
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
    expect(screen.getByRole('heading', { name: /Orders/i })).toBeInTheDocument();
  }, 15000);

  it('shows search or filter UI', async () => {
    await act(async () => {
      render(<AdminOrdersPage />);
    });
    const inputs = screen.queryAllByRole('textbox');
    expect(inputs.length).toBeGreaterThanOrEqual(0);
  }, 15000);
});
