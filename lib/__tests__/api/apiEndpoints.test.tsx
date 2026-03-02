import { API } from '../../api/endpoints';

describe('API Endpoint Structure', () => {
  it('AUTH has all expected keys', () => {
    expect(API.AUTH).toHaveProperty('LOGIN');
    expect(API.AUTH).toHaveProperty('REGISTER');
    expect(API.AUTH).toHaveProperty('LOGOUT');
    expect(API.AUTH).toHaveProperty('ME');
    expect(API.AUTH).toHaveProperty('REQUEST_PASSWORD_RESET');
    expect(API.AUTH).toHaveProperty('RESET_PASSWORD');
  });

  it('PRODUCTS has all expected keys', () => {
    expect(API.PRODUCTS).toHaveProperty('GET_ALL');
    expect(API.PRODUCTS).toHaveProperty('SEARCH');
    expect(API.PRODUCTS).toHaveProperty('PERSONALIZED');
    expect(API.PRODUCTS).toHaveProperty('CATEGORIES');
  });

  it('ORDERS has all expected keys', () => {
    expect(API.ORDERS).toHaveProperty('CREATE');
    expect(API.ORDERS).toHaveProperty('GET_USER_ORDERS');
  });

  it('ADMIN has nested structure', () => {
    expect(API.ADMIN.USERS).toHaveProperty('GET_ALL');
    expect(API.ADMIN.PRODUCTS).toHaveProperty('CREATE');
    expect(API.ADMIN.ORDERS).toHaveProperty('GET_ALL');
  });

  it('ADDRESSES has CRUD endpoints', () => {
    expect(API.ADDRESSES).toHaveProperty('CREATE');
    expect(API.ADDRESSES).toHaveProperty('GET_ALL');
    expect(typeof API.ADDRESSES.UPDATE).toBe('function');
    expect(typeof API.ADDRESSES.DELETE).toBe('function');
    expect(typeof API.ADDRESSES.SET_DEFAULT).toBe('function');
  });

  it('AUTH.LOGIN is correct path', () => {
    expect(API.AUTH.LOGIN).toBe('/api/auth/login');
  });

  it('PRODUCTS.GET_BY_ID returns correct path', () => {
    expect(API.PRODUCTS.GET_BY_ID('abc')).toBe('/api/products/abc');
  });

  it('ADMIN.ORDERS.ASSIGN_DRIVER returns correct path', () => {
    expect(API.ADMIN.ORDERS.ASSIGN_DRIVER('123')).toBe('/api/admin/orders/123/assign-driver');
  });
});
