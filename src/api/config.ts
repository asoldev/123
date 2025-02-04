export const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`;

export const createAPIEndpoint = (endpoint: string): string =>
  `${API_BASE_URL}/${endpoint}`;
