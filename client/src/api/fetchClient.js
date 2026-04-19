const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const fetchClient = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    credentials: 'include', // Important for HttpOnly cookies
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  const response = await fetch(url, defaultOptions);

  if (response.status === 401 && !url.includes('/auth/me')) {
    // Session might have expired
    window.dispatchEvent(new CustomEvent('auth-auth-expired'));
  }

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || 'Something went wrong');
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

export default fetchClient;
