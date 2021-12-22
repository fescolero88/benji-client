import { resolveApiUrl } from './apiUrl';
export default {
  apiUrl: resolveApiUrl({
    NODE_ENV: process.env.NODE_ENV,
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
    REACT_APP_PROD_BASE_URL: process.env.REACT_APP_PROD_BASE_URL,
    REACT_APP_DEV_BASE_URL: process.env.REACT_APP_DEV_BASE_URL,
    REACT_APP_STAGING_BASE_URL: process.env.REACT_APP_STAGING_BASE_URL,
  }),
};
