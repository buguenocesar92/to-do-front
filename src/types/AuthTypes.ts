// Auth Types
export interface AuthPayload {
  email: string;
  password: string;
}

// Respuesta del login
export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

// Alias para semántica, opcional
export type LoginPayload = AuthPayload;
export type RegisterUser = AuthPayload & { name: string }; // Opcionalmente extiende si se necesitan nuevos campos
