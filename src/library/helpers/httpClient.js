import 'whatwg-fetch';
import { CANCEL } from 'redux-saga';
import jwtConfig from '@iso/config/jwt.config';
import { store } from '@iso/redux/store';
import { requestUrl } from './requestUrl';
import { readResponse } from './httpResponse';

const request = (endpoint, method = 'GET', data = {}, isToken = true,
  twoFACode, isFormData = false, isOutSideApi = false) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);
  const headers = {};
  if (!isFormData) headers['Content-Type'] = 'application/json';
  if (isToken) {
    const token = store.getState().Auth.token.access;
    if (token) headers.Authorization = 'Bearer ' + token;
  }
  if (twoFACode) headers['2fa-auth'] = twoFACode;
  const options = {method, headers, signal:controller.signal};
  if (!['GET', 'DELETE'].includes(method)) options.body = isFormData ? data : JSON.stringify(data);
  const promise = fetch(requestUrl(jwtConfig.apiUrl, endpoint, method, data, isOutSideApi), options)
    .then(readResponse).finally(() => clearTimeout(timeout));
  promise[CANCEL] = () => { clearTimeout(timeout); controller.abort(); };
  return promise;
};
export default request;
