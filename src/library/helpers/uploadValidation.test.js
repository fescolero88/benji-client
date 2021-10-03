import { validateUpload } from './uploadValidation';
test('rejects empty files', () => expect(() => validateUpload({name:'empty.txt',size:0},20)).toThrow('empty'));
test('rejects files over the limit', () => expect(() => validateUpload({name:'large.txt',size:21},20)).toThrow('limit'));
test('accepts a file at the limit', () => expect(() => validateUpload({name:'ok.txt',size:20},20)).not.toThrow());
