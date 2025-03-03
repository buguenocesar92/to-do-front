// src/services/UserService.ts
import axios from '@/axiosConfig';
import type { RegisterUser, User } from '@/types/UserTypes';

/**
 * (Registro público) Registra un usuario enviando 'name', 'email' y 'password'.
 * Retorna un objeto con "frontend_url" (según tu backend).
 */
export async function registerUser(payload: RegisterUser): Promise<{ frontend_url: string }> {
  const response = await axios.post('/auth/register', payload);
  return response.data;
}

/**
 * (Creación desde el panel admin) Crea un usuario enviando 'name', 'email' y 'password'.
 */
export async function createUser(payload: RegisterUser): Promise<User> {
  const response = await axios.post('/users', payload);
  return response.data;
}

/**
 * Actualiza un usuario. Si algún campo (como la contraseña) no se desea actualizar,
 * se puede enviar como undefined o simplemente omitirlo en el payload.
 */
export async function updateUser(id: number, payload: Partial<User>): Promise<User> {
  const response = await axios.put(`/users/${id}`, payload);
  return response.data;
}

/**
 * Obtiene la lista de usuarios desde el backend.
 */
export async function fetchAllUsers(): Promise<User[]> {
  const response = await axios.get('/users');
  return response.data;
}

export async function fetchUserById(id: number): Promise<User> {
  const response = await axios.get(`/users/${id}`);
  return response.data;
}


/**
 * Elimina un usuario.
 */
export async function deleteUser(id: number): Promise<void> {
  await axios.delete(`/users/${id}`);
}

/**
 * Actualiza la asociación de usuarios a un rol determinado.
 * @param roleId  El ID (o string) del rol.
 * @param userIds Array de IDs de usuarios que se van a asociar a ese rol.
 */
export async function updateRoleUsers(roleId: string, userIds: number[]): Promise<void> {
  await axios.put(`/roles/${roleId}/users`, { users: userIds });
}

/**
 * Obtiene la lista de usuarios junto con sus ubicaciones.
 */
export async function fetchAllUsersWithLocations(): Promise<User[]> {
  const response = await axios.get('/users/with-locations');
  return response.data;
}
