// src/services/RolePermissionService.ts
import axios from '@/axiosConfig';
import type { Role, Permission } from '@/types/RoleTypes';

/**
 * Obtener todos los roles con sus permisos asociados.
 * Retorna { roles, permissions }.
 */
export const fetchRolesWithPermissions = async (): Promise<{
  roles: Role[];
  permissions: Permission[];
}> => {
  const { data } = await axios.get('/roles/with-permissions');
  return data;
};

/**
 * Obtener un rol específico con sus permisos.
 */
export const fetchRoleById = async (roleId: number | string): Promise<Role> => {
  const { data } = await axios.get(`/roles/with-permissions/${roleId}`);
  return data;
};

/**
 * Actualizar los permisos de un rol específico.
 */
export const updateRolePermissions = async (
  roleId: number | string,
  permissions: (number | string)[]
): Promise<Role> => {
  const { data } = await axios.put(`/roles/with-permissions/${roleId}`, {
    permissions,
  });
  return data.role;
};

/**
 * Obtener todos los permisos disponibles (opcional).
 */
export const fetchAllPermissions = async (): Promise<Permission[]> => {
  const { data } = await axios.get('/permissions');
  return data; // Asumiendo que el backend retorna directamente un array de permisos
};

/**
 * Sincronizar rutas y permisos.
 */
export const syncRoutePermissions = async (): Promise<{ message: string; output: string }> => {
  const { data } = await axios.post('/roles/with-permissions/sync');
  return data;
};
