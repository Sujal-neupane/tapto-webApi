import { loginSchema, registerSchema, forgotPasswordSchema, validators } from '../../validations/auth';

describe('loginSchema', () => {
  it('passes with valid email and password', () => {
    const result = loginSchema.safeParse({ email: 'test@example.com', password: 'password123' });
    expect(result.success).toBe(true);
  });

  it('fails with invalid email', () => {
    const result = loginSchema.safeParse({ email: 'notanemail', password: 'password123' });
    expect(result.success).toBe(false);
  });

  it('fails with short password', () => {
    const result = loginSchema.safeParse({ email: 'test@example.com', password: '12345' });
    expect(result.success).toBe(false);
  });

  it('fails with empty email', () => {
    const result = loginSchema.safeParse({ email: '', password: 'password123' });
    expect(result.success).toBe(false);
  });
});

describe('registerSchema', () => {
  const validData = {
    fullName: 'aayush subedi',
    email: 'subedit@example.com',
    password: 'password123',
    confirmPassword: 'password123',
    countryCode: '+977',
    phoneNumber: '9841234567',
    shoppingPreference: 'Mens Fashion' as const,
  };

  it('passes with valid registration data', () => {
    const result = registerSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('fails when passwords do not match', () => {
    const result = registerSchema.safeParse({ ...validData, confirmPassword: 'different' });
    expect(result.success).toBe(false);
  });

  it('fails with short full name', () => {
    const result = registerSchema.safeParse({ ...validData, fullName: 'A' });
    expect(result.success).toBe(false);
  });

  it('fails with non-digit phone number', () => {
    const result = registerSchema.safeParse({ ...validData, phoneNumber: 'abc123' });
    expect(result.success).toBe(false);
  });
});

describe('forgotPasswordSchema', () => {
  it('passes with valid email', () => {
    const result = forgotPasswordSchema.safeParse({ email: 'test@example.com' });
    expect(result.success).toBe(true);
  });

  it('fails with invalid email', () => {
    const result = forgotPasswordSchema.safeParse({ email: 'invalid' });
    expect(result.success).toBe(false);
  });
});

describe('validators', () => {
  it('email rejects invalid format', () => {
    const result = validators.email.safeParse('not-email');
    expect(result.success).toBe(false);
  });

  it('password rejects short strings', () => {
    const result = validators.password.safeParse('123');
    expect(result.success).toBe(false);
  });

  it('strongPassword requires uppercase', () => {
    const result = validators.strongPassword.safeParse('password1');
    expect(result.success).toBe(false);
  });

  it('strongPassword passes with valid string', () => {
    const result = validators.strongPassword.safeParse('Password1');
    expect(result.success).toBe(true);
  });
});
