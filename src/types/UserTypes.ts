// src/types/UserTypes.ts

/**
 * Datos requeridos para registrar un usuario.
 */
export interface RegisterUser {
  name: string;
  email: string;
  password: string;
}

/**
 * Representa un usuario existente en el sistema.
 * - `password` es opcional porque en muchos casos no se devuelve/usa.
 * - `created_at` y `updated_at` también pueden ser opcionales
 *   dependiendo de cómo devuelva datos tu backend.
 */
export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  created_at?: string;
  updated_at?: string;
  location_id?: number;
}

export interface Location {
  id: number;
  name: string;
  address?: string;
  phone?: string | null;
  status?: string;
  created_at?: string;
  updated_at?: string;
}
