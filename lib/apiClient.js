const API_BASE = typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, '')
  : '';

function buildUrl(pathOrUrl) {
  if (!pathOrUrl) return pathOrUrl;
  // If full URL provided, use it as-is
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  // Otherwise prepend API_BASE (if set) or use relative path
  return API_BASE ? `${API_BASE}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}` : pathOrUrl;
}

async function fetchWithAuth(pathOrUrl, options = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  if (!token) {
    throw new Error('No authentication token found');
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers,
  };

  const url = buildUrl(pathOrUrl);

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Handle unauthorized access
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/'; // Redirect to login page
    }
    throw new Error('Unauthorized access');
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'An error occurred');
  }

  return data;
}

export async function getIncome() {
  return fetchWithAuth('/api/income');
}

export async function createIncome(incomeData) {
  return fetchWithAuth('/api/income', {
    method: 'POST',
    body: JSON.stringify(incomeData),
  });
}

export async function updateIncome(id, incomeData) {
  return fetchWithAuth(`/api/income/${id}`, {
    method: 'PUT',
    body: JSON.stringify(incomeData),
  });
}

export async function deleteIncome(id) {
  return fetchWithAuth(`/api/income/${id}`, {
    method: 'DELETE',
  });
}