import {
  extractCountryCode,
  getCurrencyFromPhone,
  getCurrencyFromCountryCode,
  formatPrice,
  convertPrice,
  getAllCurrencies,
  getPaymentMethodsFromPhone,
  COUNTRY_CURRENCY_MAP,
  DEFAULT_CURRENCY,
} from '../../utils/currency';

describe('extractCountryCode', () => {
  it('extracts +977 from a Nepalese number', () => {
    expect(extractCountryCode('+9779841234567')).toBe('+977');
  });

  it('extracts +1 from a US number', () => {
    expect(extractCountryCode('+11234567890')).toBe('+1');
  });

  it('returns null for undefined input', () => {
    expect(extractCountryCode(undefined)).toBeNull();
  });

  it('returns null for empty string', () => {
    expect(extractCountryCode('')).toBeNull();
  });

  it('handles number without + prefix', () => {
    expect(extractCountryCode('9779841234567')).toBe('+977');
  });
});

describe('getCurrencyFromPhone', () => {
  it('returns NPR for Nepalese phone number', () => {
    const currency = getCurrencyFromPhone('+9779841234567');
    expect(currency.code).toBe('NPR');
    expect(currency.symbol).toBe('Rs');
  });

  it('returns USD as default for unknown number', () => {
    const currency = getCurrencyFromPhone('+99912345');
    expect(currency.code).toBe('USD');
  });

  it('returns USD for undefined phone', () => {
    const currency = getCurrencyFromPhone(undefined);
    expect(currency.code).toBe('USD');
  });
});

describe('formatPrice', () => {
  it('formats USD price correctly', () => {
    const usd = COUNTRY_CURRENCY_MAP['+1'];
    expect(formatPrice(100, usd)).toBe('$100.00');
  });

  it('formats NPR price with conversion', () => {
    const npr = COUNTRY_CURRENCY_MAP['+977'];
    const formatted = formatPrice(100, npr);
    expect(formatted).toContain('Rs');
  });

  it('uses 0 decimals for JPY', () => {
    const jpy = COUNTRY_CURRENCY_MAP['+81'];
    const formatted = formatPrice(100, jpy);
    expect(formatted).not.toContain('.');
  });

  it('uses default currency when none provided', () => {
    const formatted = formatPrice(50);
    expect(formatted).toBe('$50.00');
  });
});

describe('convertPrice', () => {
  it('returns same value for USD', () => {
    const usd = COUNTRY_CURRENCY_MAP['+1'];
    expect(convertPrice(100, usd)).toBe(100);
  });

  it('converts USD to NPR correctly', () => {
    const npr = COUNTRY_CURRENCY_MAP['+977'];
    expect(convertPrice(100, npr)).toBe(100 * npr.rate);
  });
});

describe('getAllCurrencies', () => {
  it('returns an array of unique currencies', () => {
    const currencies = getAllCurrencies();
    expect(currencies.length).toBeGreaterThan(0);
    const codes = currencies.map(c => c.code);
    expect(new Set(codes).size).toBe(codes.length);
  });
});

describe('getPaymentMethodsFromPhone', () => {
  it('returns payment methods for a known phone number', () => {
    const methods = getPaymentMethodsFromPhone('+9779841234567');
    expect(methods.length).toBeGreaterThan(0);
    expect(methods.some(m => m.id === 'esewa')).toBe(true);
  });

  it('returns USD payment methods for unknown phone', () => {
    const methods = getPaymentMethodsFromPhone(undefined);
    expect(methods.some(m => m.id === 'card')).toBe(true);
  });
});

describe('getCurrencyFromCountryCode', () => {
  it('returns correct currency for +91', () => {
    expect(getCurrencyFromCountryCode('+91').code).toBe('INR');
  });

  it('returns USD for undefined', () => {
    expect(getCurrencyFromCountryCode(undefined).code).toBe('USD');
  });
});