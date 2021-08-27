export function resolveApiUrl(env) {
  const configured = env.REACT_APP_API_URL || (env.NODE_ENV === 'production'
    ? env.REACT_APP_PROD_BASE_URL
    : env.REACT_APP_DEV_BASE_URL || env.REACT_APP_STAGING_BASE_URL);
  if (!configured) throw new Error('Set REACT_APP_API_URL before starting or building the client');
  const url = new URL(configured);
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error('The API URL must use HTTP or HTTPS');
  if (env.NODE_ENV === 'production' && url.protocol !== 'https:') throw new Error('Production API requests require HTTPS');
  return configured.replace(//+$/, '');
}
