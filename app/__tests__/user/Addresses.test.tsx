import React from 'react';
import { render, screen, act } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), refresh: jest.fn() }),
}));

jest.mock('@/lib/context/auth-context', () => ({
  useAuth: () => ({
    user: { _id: '1', fullName: 'Test User', email: 'test@test.com', role: 'user' },
    isAuthenticated: true,
    isLoading: false,
    token: 'test-token',
  }),
}));

jest.mock('@/lib/api/addresses', () => ({
  getAllAddresses: jest.fn().mockResolvedValue({ data: [] }),
  createAddress: jest.fn().mockResolvedValue({ data: { _id: 'a1' } }),
  updateAddress: jest.fn().mockResolvedValue({ data: {} }),
  deleteAddress: jest.fn().mockResolvedValue({ data: {} }),
  setDefaultAddress: jest.fn().mockResolvedValue({ data: {} }),
}));

jest.mock('lucide-react', () => ({
  MapPin: () => <div data-testid="map-icon" />,
  Plus: () => <div data-testid="plus-icon" />,
  Pencil: () => <div data-testid="edit-icon" />,
  Trash2: () => <div data-testid="trash-icon" />,
  Star: () => <div data-testid="star-icon" />,
  X: () => <div data-testid="x-icon" />,
  Home: () => <div data-testid="home-icon" />,
}));

jest.mock('cookies-next', () => ({
  setCookie: jest.fn(),
  deleteCookie: jest.fn(),
  getCookie: jest.fn(),
}));

import AddressesPage from '../../user/addresses/page';

describe('AddressesPage', () => {
  it('renders addresses heading', async () => {
    await act(async () => {
      render(<AddressesPage />);
    });
    expect(screen.getByText(/Address/i)).toBeInTheDocument();
  });

  it('shows add address button', async () => {
    await act(async () => {
      render(<AddressesPage />);
    });
    expect(screen.getByText(/Add.*Address/i)).toBeInTheDocument();
  });
});
