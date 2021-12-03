import { serializeKeys, deserializeKeys } from './keyNormalizer';
test('normalizes frozen nested API data', () => {
  const input=Object.freeze({user_name:'Pat',job_list:Object.freeze([Object.freeze({job_id:1})])});
  expect(serializeKeys(input)).toEqual({userName:'Pat',jobList:[{jobId:1}]});
  expect(input.user_name).toBe('Pat');
});
test('keeps dates and files intact', () => {
  const date=new Date(), file=new File(['x'],'x.txt');
  expect(deserializeKeys({createdAt:date,documentFile:file})).toEqual({created_at:date,document_file:file});
});
test('preserves null and primitive values', () => expect(serializeKeys([null,1,'text'])).toEqual([null,1,'text']));
