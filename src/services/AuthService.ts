// src/services/AuthService.ts
import axios from '@/axiosConfig';
import type { AuthPayload, LoginResponse } from '@/types/AuthTypes';

export const loginUser = async (payload: AuthPayload): Promise<LoginResponse> => {
  const response = await axios.post('/auth/login', payload);
  return response.data;
};

export const logoutUser = async (): Promise<void> => {
  await axios.post('/auth/logout');
};

export const fetchUserData = async (): Promise<{ name: string; email: string; roles: string[]; permissions: string[] }> => {
  const response = await axios.post('/auth/me');
  return {
    name: response.data.name || '',
    email: response.data.email || '',
    roles: response.data.roles || [],
    permissions: response.data.permissions || [],
  };
};


// src/services/AuthService.ts (añadir esta función)
export const registerUser = async (payload: AuthPayload): Promise<LoginResponse> => {
  const response = await axios.post('/auth/register', payload);
  return response.data;
};
