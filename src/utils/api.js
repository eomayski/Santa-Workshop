const API_SECRET_KEY = 'Santa-Secret-Key-2025-Workshop-Access'; 

const BASE_URL = 'https://santa-s-workshop-sirma-2025-default-rtdb.firebaseio.com/';

async function client(endpoint, { body, ...customConfig } = {}) {
  const headers = {
    'Content-Type': 'application/json',
  };

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    const bodyWithSecret = {
      ...body,
      secretKey: API_SECRET_KEY
    };
    
    config.body = JSON.stringify(bodyWithSecret);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorMessage = await response.text();
    return Promise.reject(new Error(errorMessage || 'Error on fetching data'));
  }

  if (response.status === 204) return null;

  return response.json();
}

export const api = {
  get: (endpoint, customConfig = {}) => client(endpoint, { ...customConfig, method: 'GET' }),
  
  post: (endpoint, body, customConfig = {}) => client(endpoint, { ...customConfig, body, method: 'POST' }),
  
  patch: (endpoint, body, customConfig = {}) => client(endpoint, { ...customConfig, body, method: 'PATCH' }),
  
  delete: (endpoint, customConfig = {}) => client(endpoint, { ...customConfig, method: 'DELETE' }),
};

export const firebaseApi = {
  get: (path) => api.get(`${path}.json`),
  post: (path, data) => api.post(`${path}.json`, data),
  patch: (path, data) => api.patch(`${path}.json`, data),
  delete: (path) => api.delete(`${path}.json`),
};