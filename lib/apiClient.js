async function fetchWithAuth(url, options = {}) {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Handle unauthorized access
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/'; // Redirect to login page
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