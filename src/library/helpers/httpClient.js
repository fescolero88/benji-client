import 'whatwg-fetch';
import queryString from 'qs';
import jwtConfig from '@iso/config/jwt.config'
import { store } from '@iso/redux/store';

/**
 * API request module
 *
 * @param {*} endpoint
 * @param {string} [method='GET']
 * @param {*} [data={}]
 * @param {boolean} [isToken=false]
 * @returns
 */
const request = async (
    endpoint,
    method = 'GET',
    data = {},
    isToken = true,
    twoFACode,
    isFormData = false,
    isOutSideApi = false
) => {
  return new Promise((resolve, reject) => {
    let qs = '';
    let body;

    if (['GET', 'DELETE'].indexOf(method) > -1) {
      qs = `?${queryString.stringify(data, { arrayFormat: 'bracket' })}`;
    } else {
      body = isFormData ? data : JSON.stringify(data);
    }

    const requestUrl = isOutSideApi ? endpoint : `${jwtConfig.apiUrl}${endpoint}${qs}`;
    const options = {
      method,
      headers: {},
      body,
    };

    if (!isFormData) {
      options.headers['Content-Type'] = 'application/json';
    }

    if (isToken) {
      options.headers.Authorization = `Bearer ${
          store.getState().Auth.token.access
      }`;
    }

    if (twoFACode) {
      options.headers['2fa-auth'] = twoFACode;
    }

    fetch(requestUrl, options)
        .then((result) => {
          if (result.status >= 200 && result.status < 300) {
            if (result.status === 204) return resolve();
            return resolve(result.json());
          }
          return result.json().then(reject);
        })
        .catch((err) => reject(err));
  });
};

export default request;
