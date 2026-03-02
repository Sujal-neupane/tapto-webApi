import * as allMatchers from '@testing-library/jest-dom/matchers';

const { default: _default, ...matchers } = allMatchers as Record<string, unknown>;
expect.extend(matchers as any);