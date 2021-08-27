import { resolveApiUrl } from './apiUrl';
test('production selects production instead of staging', () => {
  expect(resolveApiUrl({NODE_ENV:'production', REACT_APP_PROD_BASE_URL:'https://api.example.com/', REACT_APP_STAGING_BASE_URL:'https://stage.example.com'})).toBe('https://api.example.com');
});
test('explicit API URL wins', () => expect(resolveApiUrl({REACT_APP_API_URL:'http://localhost:8000'})).toBe('http://localhost:8000'));
test('missing configuration fails clearly', () => expect(() => resolveApiUrl({})).toThrow('REACT_APP_API_URL'));
test('production rejects insecure transport', () => expect(() => resolveApiUrl({NODE_ENV:'production',REACT_APP_API_URL:'http://example.com'})).toThrow('HTTPS'));
