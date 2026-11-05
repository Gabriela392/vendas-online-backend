import { afterEach, describe, expect, it } from '@jest/globals';
import { isDevAuthBypassEnabled } from './dev-auth-bypass';

const originalNodeEnv = process.env.NODE_ENV;
const originalAuthBypass = process.env.AUTH_BYPASS;

afterEach(() => {
  if (originalNodeEnv === undefined) {
    delete process.env.NODE_ENV;
  } else {
    process.env.NODE_ENV = originalNodeEnv;
  }

  if (originalAuthBypass === undefined) {
    delete process.env.AUTH_BYPASS;
  } else {
    process.env.AUTH_BYPASS = originalAuthBypass;
  }
});

describe('isDevAuthBypassEnabled', () => {
  it('enables bypass only when explicitly enabled in development', () => {
    process.env.NODE_ENV = 'development';
    process.env.AUTH_BYPASS = 'true';

    expect(isDevAuthBypassEnabled()).toBe(true);
  });

  it('keeps bypass disabled in other environments', () => {
    process.env.NODE_ENV = 'production';
    process.env.AUTH_BYPASS = 'true';

    expect(isDevAuthBypassEnabled()).toBe(false);
  });

  it('keeps bypass disabled unless explicitly enabled', () => {
    process.env.NODE_ENV = 'development';
    delete process.env.AUTH_BYPASS;

    expect(isDevAuthBypassEnabled()).toBe(false);
  });
});
