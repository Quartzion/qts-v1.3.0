const IS_TEST = process.env.NODE_ENV === 'test';
const QTS_VERSION = import.meta.env.VITE_QTS_VERSION;

// fallback for Jest
const testEnv = {
  VITE_PORT: '3000',
  VITE_DEV_API_BASE_URL: 'http://localhost:',
  VITE_PROD_API_BASE_URL: 'https://prod.url',
};

const getEnv = (key) => {
  return IS_TEST
    ? testEnv[key]
    : import.meta.env[key];
};

export const getEnvMode = () => getEnv('MODE') || 'development';
export const isProd = () => getEnvMode() === 'production';

export const getApiBaseUrl = () => {
  const port = getEnv('VITE_PORT') || '';
  return isProd()
    ? getEnv('VITE_PROD_API_BASE_URL')
    : getEnv('VITE_DEV_API_BASE_URL') + port;
};

export default function getQtsVersion () {
return QTS_VERSION
}
