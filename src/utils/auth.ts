import { User } from 'types/interfaces';

export const getUser = () => {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  return JSON.parse(userStr) as User;
};

export const getToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
};

export const clearUser = () => {
  if (typeof window === 'undefined') return null;
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  return;
};
