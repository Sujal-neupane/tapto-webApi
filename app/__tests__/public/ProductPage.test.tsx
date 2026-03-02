import React from 'react';
import { render, screen } from '@testing-library/react';

// The public page.tsx just redirects
jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

import { redirect } from 'next/navigation';
import RootPage from '../../(public)/page';

describe('Public Root Page', () => {
  it('calls redirect to /landingpage', () => {
    expect(() => RootPage()).not.toThrow();
    expect(redirect).toHaveBeenCalledWith('/landingpage');
  });
});