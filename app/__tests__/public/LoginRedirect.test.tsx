import { redirect } from 'next/navigation';

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

import LoginRedirectPage from '../../login/page';

describe('LoginRedirectPage', () => {
  it('calls redirect to /auth/login', () => {
    LoginRedirectPage();
    expect(redirect).toHaveBeenCalledWith('/auth/login');
  });

  it('returns null', () => {
    const result = LoginRedirectPage();
    expect(result).toBeNull();
  });
});
