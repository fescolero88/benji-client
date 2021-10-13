jest.mock('./httpClient', () => jest.fn());
jest.mock('@iso/config/env', () => ({maxFileUploadSize:20*1024*1024}));
jest.mock('js-file-download', () => jest.fn());
import request from './httpClient';
import fileDownload from 'js-file-download';
import { uploadFile, downloadFile } from './s3';
beforeEach(() => { jest.clearAllMocks(); global.fetch=jest.fn(); });
afterEach(() => { delete global.fetch; });
test('sends the file only to the signed URL', async () => {
  request.mockResolvedValue({upload_url:'https://storage.example.com/signed',location:'https://storage.example.com/file'});
  global.fetch.mockResolvedValue({ok:true});
  const file=new File(['hello'],'test.txt',{type:'text/plain'});
  expect(await uploadFile(file,'docs')).toEqual({location:'https://storage.example.com/file',error:null});
  expect(global.fetch.mock.calls[0][1].body).toBe(file);
  expect(global.fetch.mock.calls[0][1].headers.Authorization).toBeUndefined();
});
test('does not save a failed download', async () => {
  global.fetch.mockResolvedValue({ok:false});
  await expect(downloadFile('https://example.com/file','file')).rejects.toThrow('download failed');
  expect(fileDownload).not.toHaveBeenCalled();
});
