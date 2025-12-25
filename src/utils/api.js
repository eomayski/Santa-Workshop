
const BASE_URL = 'https://santa-s-workshop-sirma-2025-default-rtdb.firebaseio.com/';


async function client(endpoint, { body, ...customConfig } = {}) {
  const headers = {
    'Content-Type': 'application/json',
  };
  

  //TODO Authentication logic

  // const token = localStorage.getItem('token');
  // if (token) {
  //   headers.Authorization = `Bearer ${token}`;
  // }

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorMessage = await response.text();
    return Promise.reject(new Error(errorMessage || 'Error on fetching data'));
  }

  if (response.status === 204) return null;

  return response.json();
}

// Експортваме конкретните методи за удобство
export const api = {
  get: (endpoint, customConfig = {}) => client(endpoint, { ...customConfig, method: 'GET' }),
  
  post: (endpoint, body, customConfig = {}) => client(endpoint, { ...customConfig, body, method: 'POST' }),
  
  patch: (endpoint, body, customConfig = {}) => client(endpoint, { ...customConfig, body, method: 'PATCH' }),
  
  delete: (endpoint, customConfig = {}) => client(endpoint, { ...customConfig, method: 'DELETE' }),
};

// За Firebase добавяме .json където е нужно
export const firebaseApi = {
  get: (path) => api.get(`${path}.json`),
  post: (path, data) => api.post(`${path}.json`, data),
  patch: (path, data) => api.patch(`${path}.json`, data),
  delete: (path) => api.delete(`${path}.json`),
};