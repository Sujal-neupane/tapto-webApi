import React from 'react';
import { render, screen } from '@testing-library/react';
import ForgotPasswordPage from '../../(auth)/forgotpassword/page';

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href} data-testid={`link-${href}`}>{children}</a>
  );
});

jest.mock('next/image', () => {
  return ({ src, alt }: any) => <img src={src} alt={alt} data-testid="image" />;
});

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), refresh: jest.fn() }),
}));

jest.mock('@/app/(auth)/(_components)/forgotpasswordform', () => ({
  __esModule: true,
  default: function MockForgotPasswordForm() {
    return <div data-testid="forgot-password-form">Mock Forgot Password Form</div>;
  },
}));

jest.mock('@/app/(auth)/(_components)/auth-hero-panel', () => ({
  __esModule: true,
  default: function MockAuthHeroPanel({ variant }: { variant: string }) {
    return <div data-testid={`auth-hero-${variant}`}>Mock Hero Panel</div>;
  },
}));

describe('ForgotPasswordPage', () => {
  it('renders the forgot password form', () => {
    render(<ForgotPasswordPage />);
    expect(screen.getByText(/Reset Password/i)).toBeInTheDocument();
  });

  it('has a back link to login', () => {
    render(<ForgotPasswordPage />);
    const backLink = screen.getByTestId('link-/auth/login');
    expect(backLink).toHaveAttribute('href', '/auth/login');
  });

  it('displays Reset Password heading', () => {
    render(<ForgotPasswordPage />);
    expect(screen.getByText('Reset Password')).toBeInTheDocument();
  });

  it('renders the hero panel', () => {
    render(<ForgotPasswordPage />);
    expect(screen.getByTestId('auth-hero-forgot')).toBeInTheDocument();
  });
});
