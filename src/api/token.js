import {
  API_URL_TOKEN,
  ACCESS_KEY,
  SECRET_KEY,
  REDIRECT_URI,
  GRANT_TYPE,
} from './const';

export const getUrlToken = (code) => {
  const searchParams = new URLSearchParams('');

  searchParams.append('client_id', ACCESS_KEY);
  searchParams.append('client_secret', SECRET_KEY);
  searchParams.append('redirect_uri', REDIRECT_URI);
  searchParams.append('code', code);
  searchParams.append('grant_type', GRANT_TYPE);

  return `${API_URL_TOKEN}${searchParams.toString()}`;
};
