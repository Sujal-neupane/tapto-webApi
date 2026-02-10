import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from '../../auth/login/page';

// Mock Next.js components
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href} data-testid={`link-${href}`}>{children}</a>
  );
});

jest.mock('next/image', () => {
  return ({ src, alt, width, height, className }: any) => (
    <img src={src} alt={alt} width={width} height={height} className={className} data-testid="image" />
  );
});

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), refresh: jest.fn() }),
}));

// Mock custom components
jest.mock('@/app/(auth)/(_components)/loginform', () => {
  return function MockLoginForm() {
    return <div data-testid="login-form">Mock Login Form</div>;
  };
});

jest.mock('@/app/(auth)/(_components)/auth-hero-panel', () => {
  return function MockAuthHeroPanel({ variant }: { variant: string }) {
    return <div data-testid={`auth-hero-${variant}`}>Mock Hero Panel</div>;
  };
});

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  ArrowLeft: () => <div data-testid="arrow-left-icon" />,
  Lock: () => <div data-testid="lock-icon" />,
  ChevronRight: () => <div data-testid="chevron-right-icon" />,
}));

describe('LoginPage', () => {
  it('renders the login page with branding and form', () => {
    render(<LoginPage />);
    expect(screen.getByText('Welcome Back!')).toBeInTheDocument();
    expect(screen.getByText('Sign in to continue your shopping journey.')).toBeInTheDocument();
    expect(screen.getByText('TAPTO')).toBeInTheDocument();
    expect(screen.getByTestId('image')).toBeInTheDocument();
    expect(screen.getByText('Secure Login')).toBeInTheDocument();
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
    expect(screen.getByText('Protected by 256-bit SSL encryption')).toBeInTheDocument();
  });

  it('has a back link to landing page', () => {
    render(<LoginPage />);
    const backLink = screen.getByTestId('link-/landingpage');
    expect(backLink).toHaveAttribute('href', '/landingpage');
  });

  it('has a sign-up CTA linking to register', () => {
    render(<LoginPage />);
    const registerLink = screen.getByTestId('link-/auth/register');
    expect(registerLink).toHaveAttribute('href', '/auth/register');
    expect(screen.getByText('Create an account')).toBeInTheDocument();
  });

  it('renders the hero panel with login variant', () => {
    render(<LoginPage />);
    expect(screen.getByTestId('auth-hero-login')).toBeInTheDocument();
  });

  it('displays the mobile logo', () => {
    render(<LoginPage />);
    expect(screen.getByText('TAPTO')).toBeInTheDocument();
  });
});