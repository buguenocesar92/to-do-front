// src/types/RoleTypes.ts
import type { User } from './UserTypes';

/**
 * Representa un permiso.
 */
export interface Permission {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
}

/**
 * Representa un rol,
 * que incluye permisos y usuarios asociados.
 */
export interface Role {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  permissions: Permission[];
  users: User[];  // <-- usamos la interfaz unificada de User
}

/**
 * Formularios de creación/edición de Roles (si los necesitas).
 */
export interface CreateRoleForm {
  name: string;
  // Otros campos que necesites para crear
}

export interface UpdateRoleForm {
  name: string;
  // Otros campos que necesites para actualizar
}
