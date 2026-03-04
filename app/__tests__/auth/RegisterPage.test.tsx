import React from 'react';
import { render, screen } from '@testing-library/react';
import RegisterPage from '../../auth/register/page';

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

jest.mock('@/app/(auth)/(_components)/registerform', () => ({
  __esModule: true,
  default: function MockRegisterForm() {
    return <div data-testid="register-form">Mock Register Form</div>;
  },
}));

jest.mock('@/app/(auth)/(_components)/auth-hero-panel', () => ({
  __esModule: true,
  default: function MockAuthHeroPanel({ variant }: { variant: string }) {
    return <div data-testid={`auth-hero-${variant}`}>Mock Hero Panel</div>;
  },
}));

describe('RegisterPage', () => {
  it('renders the register page with form', () => {
    render(<RegisterPage />);
    expect(screen.getByTestId('register-form')).toBeInTheDocument();
  });

  it('has a back link to landing page', () => {
    render(<RegisterPage />);
    const backLink = screen.getByTestId('link-/landingpage');
    expect(backLink).toHaveAttribute('href', '/landingpage');
  });

  it('has a sign-in link to login', () => {
    render(<RegisterPage />);
    const loginLink = screen.getByTestId('link-/auth/login');
    expect(loginLink).toHaveAttribute('href', '/auth/login');
  });

  it('renders the hero panel with register variant', () => {
    render(<RegisterPage />);
    expect(screen.getByTestId('auth-hero-register')).toBeInTheDocument();
  });

  it('displays Create Account heading', () => {
    render(<RegisterPage />);
    expect(screen.getByText('Create Account')).toBeInTheDocument();
  });
});
