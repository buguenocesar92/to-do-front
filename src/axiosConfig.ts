// src/axiosConfig.ts

import axios, { AxiosError } from 'axios';
import type { AxiosInstance } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import { isSubdomain } from '@/utils/domainUtils';

/* -------------------------------------
 * 1. Lógica de Subdominio y baseURL
 * ------------------------------------- */

/**
 * Retorna un posible subdominio (ej. 'tenant1') si existe;
 * de lo contrario, null.
 */
function getSubdomain(): string | null {
  return isSubdomain()
    ? window.location.host.split('.')[0] // Ej: 'tenant1'
    : null;
}

/**
 * Construye la URL base según:
 * - Variables de entorno VITE_API_PROTOCOL y VITE_API_DOMAIN
 * - Fallback sin subdominio (VITE_API_BASE_URL)
 * - O un valor por defecto si las variables no existen.
 */
function getBaseURL(): string {
  const protocol = import.meta.env.VITE_API_PROTOCOL;
  const baseDomain = import.meta.env.VITE_API_DOMAIN;
  const fallbackUrl = import.meta.env.VITE_API_BASE_URL;

  const subdomain = getSubdomain();
  if (subdomain) {
    // http://tenant1.api.localhost/api/ (ejemplo)
    return `${protocol}://${subdomain}.${baseDomain}/api/`;
  } else {
    // Sin subdominio, usar fallback
    return fallbackUrl;
  }
}



// Determina la baseURL final
const baseURL = getBaseURL();
console.log('Base URL:', baseURL);
/* -------------------------------------
 * 2. Creación de la instancia de Axios
 * ------------------------------------- */
const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 5000,
});

/* -------------------------------------
 * 3. Manejo de cola para solicitudes fallidas (Refresh Token)
 * ------------------------------------- */

// Almacena la resolución/rechazo de cada petición en espera
interface FailedRequest {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

/**
 * Procesa las peticiones en cola:
 * - Si hay un nuevo token, se resuelven con ese token.
 * - Si hay error, se rechazan.
 */
function processQueue(error: unknown, token: string | null = null): void {
  failedQueue.forEach(({ resolve, reject }) => {
    if (token) {
      resolve(token);
    } else {
      reject(error);
    }
  });
  failedQueue = [];
}

/* -------------------------------------
 * 4. Interceptor de requests (incluir access_token)
 * ------------------------------------- */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      // Para Axios >= 1.2, usa config.headers.set():
      config.headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

/* -------------------------------------
 * 5. Interceptor de respuestas (manejo global de errores, refresh token)
 * ------------------------------------- */
axiosInstance.interceptors.response.use(
  // Respuesta exitosa: simplemente retornarla
  (response) => response,

  // Manejo de errores
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Si es 401 (Unauthorized) y no hemos intentado refresh todavía
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      // Evita reintentar refresh en la ruta de login
      if (originalRequest.url?.includes('/auth/login')) {
        return Promise.reject(error);
      }

      // Si ya estamos refrescando, añadir esta petición a la cola
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            // Después de refrescar, reintentar con el nuevo token
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      // Marcar esta request para no reintentar infinito
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Leer el refresh token de localStorage
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Llamada al endpoint para refrescar token
        const response = await axios.post(`${baseURL}auth/refresh`, null, {
          headers: { Authorization: `Bearer ${refreshToken}` },
        });

        const { access_token, refresh_token } = response.data;

        // Guardar nuevos tokens
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);

        // Procesar la cola de peticiones fallidas con el nuevo token
        processQueue(null, access_token);

        // Reintentar la petición original
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
        }
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Si falla el refresh, rechazar la cola y limpiar tokens
        processQueue(refreshError, null);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        return Promise.reject(refreshError);
      } finally {
        // Ya no estamos refrescando
        isRefreshing = false;
      }
    }

    // Si no es un 401 (o ya se reintento), rechazar el error directamente
    return Promise.reject(error);
  },
);

export default axiosInstance;
