const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const fetchClient = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);

    if (response.status === 401 && !url.includes('/auth/me')) {
      window.dispatchEvent(new CustomEvent('auth-auth-expired'));
    }

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message || `Request failed with status ${response.status}`);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (error) {
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      console.error('Network Error: Make sure your server is running at', BASE_URL);
      throw new Error(`Cannot connect to server at ${BASE_URL}. Is your backend running?`);
    }
    throw error;
  }
};

export default fetchClient;
