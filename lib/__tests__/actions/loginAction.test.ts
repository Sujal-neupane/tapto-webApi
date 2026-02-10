// Testing auth-action server actions — we mock the underlying API calls

jest.mock('../../api/auth', () => ({
  login: jest.fn(),
  register: jest.fn(),
  requestPasswordReset: jest.fn(),
  resetPassword: jest.fn(),
}));

jest.mock('next/headers', () => ({
  cookies: jest.fn(() => ({
    set: jest.fn(),
    delete: jest.fn(),
  })),
}));

import { handleLogin, handleLogout } from '../../actions/auth-action';
import { login } from '../../api/auth';

const mockedLogin = login as jest.MockedFunction<typeof login>;

describe('handleLogin', () => {
  it('returns success when login API returns success', async () => {
    mockedLogin.mockResolvedValueOnce({
      success: true,
      message: 'Login successful',
      data: { _id: '1', email: 'test@test.com', fullName: 'Test', role: 'user' },
      token: 'fake-token',
    });

    const result = await handleLogin({ email: 'test@test.com', password: 'password' });
    expect(result.success).toBe(true);
    expect(result.token).toBe('fake-token');
  });

  it('returns failure when login API returns failure', async () => {
    mockedLogin.mockResolvedValueOnce({
      success: false,
      message: 'Invalid credentials',
    });

    const result = await handleLogin({ email: 'bad@test.com', password: 'wrong' });
    expect(result.success).toBe(false);
    expect(result.message).toBe('Invalid credentials');
  });

  it('handles API errors gracefully', async () => {
    mockedLogin.mockRejectedValueOnce(new Error('Network error'));

    const result = await handleLogin({ email: 'test@test.com', password: 'password' });
    expect(result.success).toBe(false);
    expect(result.message).toBe('Network error');
  });
});

describe('handleLogout', () => {
  it('returns success on logout', async () => {
    const result = await handleLogout();
    expect(result.success).toBe(true);
  });
});