import api from './api';

// src/services/auth.js
export const login = async (username, password) => {
  try {
    console.log('Tentando login com:', { username });
    const response = await api.post('/token/', { username, password });
    console.log('Resposta do login:', response.data);
    const { access, refresh } = response.data;
    console.log('Token recebido:', access);
    localStorage.setItem('token', access);
    localStorage.setItem('refreshToken', refresh);
    return response.data;
  } catch (error) {
    console.error('Erro no login:', error.response?.data || error.message);
    throw error;
  }
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  console.log('Token encontrado:', !!token);
  return !!token;
};

export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};