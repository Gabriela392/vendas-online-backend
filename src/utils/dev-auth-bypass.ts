export const isDevAuthBypassEnabled = (): boolean =>
  process.env.NODE_ENV === 'development' && process.env.AUTH_BYPASS === 'true';
