const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

const jsonHeaders = {
  'Content-Type': 'application/json'
};

const authFetch = async (endpoint, token, options = {}) => {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      ...jsonHeaders,
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.message || response.statusText || 'Request failed');
  }

  return payload;
};

export const loginRequest = async (username, password) => {
  return authFetch('/auth/login', null, {
    method: 'POST',
    body: JSON.stringify({ username, password })
  });
};

export const fetchProfile = async (token) => {
  return authFetch('/auth/profile', token, { method: 'GET' });
};

export const fetchDevices = async () => {
  return authFetch('/devices', null, { method: 'GET' });
};

export const diagnoseDevice = async (payload, token) => {
  return authFetch('/devices/diagnose', token, {
    method: 'POST',
    body: JSON.stringify(payload)
  });
};

export const fetchReports = async () => {
  return authFetch('/reports', null, { method: 'GET' });
};

export const fetchReportById = async (id) => {
  return authFetch(`/reports/${id}`, null, { method: 'GET' });
};
