import axios from 'axios';

// Create axios instance with base configuration
const apiClient = axios.create({
  // baseURL: 'https://api.kuzcocrm.com/catalog',
  baseURL: 'http://localhost:3000/catalog',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor (optional - for adding auth tokens, etc.)
apiClient.interceptors.request.use(
  (config) => {
    // Add any request modifications here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      // Server responded with error status
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // Request made but no response received
      return Promise.reject({
        statusCode: 0,
        message: 'Network error: No response from server',
      });
    } else {
      // Error setting up request
      return Promise.reject({
        statusCode: 0,
        message: error.message || 'An unexpected error occurred',
      });
    }
  }
);

export default apiClient;

