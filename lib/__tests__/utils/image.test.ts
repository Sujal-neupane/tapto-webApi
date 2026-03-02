import { resolveImageUrl } from '../../utils/image';

describe('resolveImageUrl', () => {
  it('returns default avatar for null input', () => {
    expect(resolveImageUrl(null)).toBe('/default-avatar.svg');
  });

  it('returns default avatar for undefined input', () => {
    expect(resolveImageUrl(undefined)).toBe('/default-avatar.svg');
  });

  it('returns the same URL for http URLs', () => {
    expect(resolveImageUrl('http://example.com/img.png')).toBe('http://example.com/img.png');
  });

  it('returns the same URL for blob URLs', () => {
    expect(resolveImageUrl('blob:http://localhost/abc')).toBe('blob:http://localhost/abc');
  });

  it('returns the same URL for data URLs', () => {
    expect(resolveImageUrl('data:image/png;base64,abc')).toBe('data:image/png;base64,abc');
  });

  it('normalizes backslashes to forward slashes for uploads path', () => {
    const result = resolveImageUrl('uploads\\products\\img.png');
    expect(result).toContain('/uploads/products/img.png');
  });
});