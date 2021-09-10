import qs from 'qs';
export function requestUrl(base, endpoint, method, data, outside = false) {
  const url = outside ? endpoint : base + endpoint;
  if (!['GET', 'DELETE'].includes(method) || !data) return url;
  const query = qs.stringify(data, { arrayFormat: 'brackets' });
  if (!query) return url;
  const [path, fragment] = url.split('#');
  return path + (path.includes('?') ? '&' : '?') + query + (fragment ? '#' + fragment : '');
}
