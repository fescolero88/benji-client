import jwtConfig from './jwt.config';

export { default as apiConfig } from './jwt.config';
export const baseUrl = jwtConfig.apiUrl;

export const maxFileUploadSize = 20 * 1024 * 1024;

export const openWeather = {
  key: process.env.REACT_APP_OPEN_WEATHER_KEY,
  url: process.env.REACT_APP_OPEN_WEATHER_URL
}
