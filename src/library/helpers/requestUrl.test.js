import { requestUrl } from './requestUrl';
test('preserves existing query parameters', () => expect(requestUrl('https://api.example.com','/items/?page=2','GET',{status:'active'})).toBe('https://api.example.com/items/?page=2&status=active'));
test('does not append an empty query', () => expect(requestUrl('','/items/','GET',null)).toBe('/items/'));
test('encodes array filters with brackets', () => expect(requestUrl('','/items/','GET',{id:[1,2]})).toContain('id%5B%5D=1'));
