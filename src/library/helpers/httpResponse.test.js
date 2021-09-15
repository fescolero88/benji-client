import { readResponse } from './httpResponse';
const response = (status, body) => ({status, ok:status>=200 && status<300, text:async()=>body});
test('accepts an empty success response', async () => expect(await readResponse(response(204,''))).toBeUndefined());
test('retains structured validation errors', async () => expect(readResponse(response(400,'{"email":["Invalid"]}'))).rejects.toMatchObject({status:400,email:['Invalid']}));
test('handles gateway HTML without a JSON parsing error', async () => expect(readResponse(response(502,'<html>bad gateway</html>'))).rejects.toMatchObject({status:502}));
test('rejects malformed JSON in successful responses', async () => expect(readResponse(response(200,'broken'))).rejects.toThrow('invalid JSON'));
