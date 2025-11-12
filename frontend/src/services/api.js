import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const userService = {
  getUsers: (page = 1, limit = 10) => {
    return api.get(`/users?page=${page}&limit=${limit}`);
  },
  
  searchUsers: (query, page = 1, limit = 10) => {
    return api.get(`/users/search?query=${query}&page=${page}&limit=${limit}`);
  },
  
  getUserById: (id) => {
    return api.get(`/users/${id}`);
  },
  
  createUser: (userData) => {
    return api.post('/users', userData);
  },
  
  updateUser: (id, userData) => {
    return api.put(`/users/${id}`, userData);
  },
  
  deleteUser: (id) => {
    return api.delete(`/users/${id}`);
  },
  
  exportToCSV: () => {
    return api.get('/users/export', {
      responseType: 'blob',
    });
  },
};

export default api;

