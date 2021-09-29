import 'whatwg-fetch';
import fileDownload from 'js-file-download';
import request from './httpClient';

export const uploadFile = async (file, dirName) => {
  try {
    const signed = await request(process.env.REACT_APP_UPLOAD_SIGNING_PATH || '/uploads/presign/', 'POST', {
      filename: file.name, content_type: file.type || 'application/octet-stream', directory: dirName
    });
    if (!signed || !signed.upload_url || !signed.location) throw new Error('The upload service returned an invalid response');
    const response = await fetch(signed.upload_url, {
      method: 'PUT', headers: signed.headers || {'Content-Type': file.type || 'application/octet-stream'}, body: file
    });
    if (!response.ok) throw new Error('The file upload failed');
    return {location: signed.location, error:null};
  } catch (error) { return {location:null, error:error.message}; }
};

export const downloadFile = async (url, filename) => {
  const response = await fetch(url);
  const downloaded = await response.arrayBuffer();
  fileDownload(downloaded, filename);
};
