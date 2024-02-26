import {
  API_URL_AUTH,
  ACCESS_KEY,
  REDIRECT_URI,
  RESPONSE_TYPE,
  SCOPE,
} from './const';

const searchParams = new URLSearchParams('');

searchParams.append('client_id', ACCESS_KEY);
searchParams.append('redirect_uri', REDIRECT_URI);
searchParams.append('response_type', RESPONSE_TYPE);
searchParams.append('scope', SCOPE);

export const urlAuth = `${API_URL_AUTH}${searchParams.toString()}`;
