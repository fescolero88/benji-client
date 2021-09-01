import { resolveApiUrl } from './apiUrl';
const {
  REACT_APP_STAGING_BASE_URL: STAGE_BASE_URL,
  REACT_APP_PROD_BASE_URL: PROD_BASE_URL,
  REACT_APP_DEV_BASE_URL: DEV_BASE_URL,
  REACT_APP_S3_BUCKET_NAME: S3_BUCKET_NAME,
  REACT_APP_S3_BUCKET_REGION: S3_BUCKET_REGION,
  REACT_APP_S3_BUCKET_ACCESS_KEY_ID: S3_BUCKET_ACCESS_KEY_ID,
  REACT_APP_S3_BUCKET_SECRET_ACCESS_KEY: S3_BUCKET_SECRET_ACCESS_KEY,
  REACT_APP_OPEN_WEATHER_KEY, REACT_APP_OPEN_WEATHER_URL
} = process.env;

export { default as apiConfig } from './jwt.config';
export const baseUrl = resolveApiUrl(process.env);

// For staging
export const s3BucketConfig = {
  bucketName: S3_BUCKET_NAME,
  region: S3_BUCKET_REGION,
  accessKeyId: S3_BUCKET_ACCESS_KEY_ID,
  secretAccessKey: S3_BUCKET_SECRET_ACCESS_KEY,
};

export const maxFileUploadSize = 20 * 1024 * 1024;

export const openWeather = {
  key: REACT_APP_OPEN_WEATHER_KEY,
  url: REACT_APP_OPEN_WEATHER_URL
}