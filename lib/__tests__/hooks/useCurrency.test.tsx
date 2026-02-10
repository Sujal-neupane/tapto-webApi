import React from 'react';
import { render, screen, act } from '@testing-library/react';

jest.mock('@/lib/context/auth-context', () => ({
  useAuth: () => ({
    user: { phoneNumber: '+9779841234567' },
  }),
}));

jest.mock('cookies-next', () => ({
  setCookie: jest.fn(),
  deleteCookie: jest.fn(),
  getCookie: jest.fn(),
}));

import { useCurrency } from '../../hooks/useCurrency';

function TestComponent() {
  const { currency, format, paymentMethods } = useCurrency();
  return (
    <div>
      <span data-testid="code">{currency.code}</span>
      <span data-testid="formatted">{format(100)}</span>
      <span data-testid="methods">{paymentMethods.length}</span>
    </div>
  );
}

describe('useCurrency', () => {
  it('returns NPR for Nepalese phone number', async () => {
    render(<TestComponent />);
    await act(async () => {});
    expect(screen.getByTestId('code').textContent).toBe('NPR');
  });

  it('formats price in NPR', async () => {
    render(<TestComponent />);
    await act(async () => {});
    expect(screen.getByTestId('formatted').textContent).toContain('Rs');
  });

  it('returns payment methods for Nepal', async () => {
    render(<TestComponent />);
    await act(async () => {});
    expect(Number(screen.getByTestId('methods').textContent)).toBeGreaterThan(0);
  });
});
