import { API } from '../../api/endpoints';

describe('API Endpoints', () => {
  it('has correct LOGIN endpoint', () => {
    expect(API.AUTH.LOGIN).toBe('/api/auth/login');
  });

  it('has correct REGISTER endpoint', () => {
    expect(API.AUTH.REGISTER).toBe('/api/auth/register');
  });

  it('generates correct user update URL', () => {
    expect(API.AUTH.UPDATE_BY_ID('abc123')).toBe('/api/auth/abc123');
  });

  it('has correct products GET_ALL endpoint', () => {
    expect(API.PRODUCTS.GET_ALL).toBe('/api/products');
  });

  it('generates correct product by ID URL', () => {
    expect(API.PRODUCTS.GET_BY_ID('prod1')).toBe('/api/products/prod1');
  });

  it('generates correct order by ID URL', () => {
    expect(API.ORDERS.GET_BY_ID('order1')).toBe('/api/orders/order1');
  });
});

describe('API Admin Endpoints', () => {
  it('has correct admin dashboard endpoint', () => {
    expect(API.ADMIN.DASHBOARD).toBe('/api/admin/dashboard/stats');
  });

  it('generates correct admin user URL', () => {
    expect(API.ADMIN.USERS.GET_BY_ID('u1')).toBe('/api/admin/users/u1');
  });

  it('generates correct admin order status URL', () => {
    expect(API.ADMIN.ORDERS.UPDATE_STATUS('o1')).toBe('/api/admin/orders/o1/status');
  });
});

describe('API Address Endpoints', () => {
  it('has correct addresses GET_ALL endpoint', () => {
    expect(API.ADDRESSES.GET_ALL).toBe('/api/addresses');
  });

  it('generates correct set default address URL', () => {
    expect(API.ADDRESSES.SET_DEFAULT('a1')).toBe('/api/addresses/a1/default');
  });

  it('generates correct delete address URL', () => {
    expect(API.ADDRESSES.DELETE('a1')).toBe('/api/addresses/a1');
  });
});