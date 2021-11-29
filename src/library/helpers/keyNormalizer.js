export const snakeToCamel = key => key.replace(/_([a-z0-9])/g, (_, letter) => letter.toUpperCase());
export const camelToSnake = key => key.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
function normalize(data, keyFor) {
  if (Array.isArray(data)) return data.map(value => normalize(value, keyFor));
  if (!data || Object.getPrototypeOf(data) !== Object.prototype) return data;
  return Object.fromEntries(Object.entries(data).map(([key, value]) => [keyFor(key), normalize(value, keyFor)]));
}
export const serializeKeys = data => normalize(data, snakeToCamel);
export const deserializeKeys = data => normalize(data, camelToSnake);
export const numberWithCommas = value => value.toLocaleString();
