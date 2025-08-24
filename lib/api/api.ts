import axios from 'axios';

const stripTrailingSlash = (s: string) => s.replace(/\/+$/, '');
const isBrowser = typeof window !== 'undefined';

export default function getBaseUrl(): string {
  if (process.env.SITE_URL) {
    return stripTrailingSlash(process.env.SITE_URL);
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  if (process.env.NEXT_PUBLIC_API_URL) {
    return stripTrailingSlash(process.env.NEXT_PUBLIC_API_URL);
  }
  if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT ?? '3000';
    return `http://localhost:${port}`;
  }
  throw new Error('Base URL is not defined in environment variables');
}

export const nextServer = axios.create({
  baseURL: (isBrowser ? '' : getBaseUrl()) + '/api',
  withCredentials: true,
});
