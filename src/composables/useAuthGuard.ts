// src/composables/useAuthGuard.ts
import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia';

export function useAuthGuard() {
  const authStore = useAuthStore();
  const { isAuthenticated, accessToken, refreshToken, roles, permissions } = storeToRefs(authStore);

  /**
   * Verifica si hay tokens en localStorage y actualiza el estado
   */
  async function checkAuth() {
    authStore.checkAuth();
    // Si deseas validar tokens en el servidor antes de setear isAuthenticated,
    // podrías añadir lógica extra aquí.
  }

  /**
   * Carga roles y permisos solo si aún no han sido cargados
   */
  async function fetchUserDataIfNeeded() {
    if (!roles.value.length || !permissions.value.length) {
      await authStore.fetchUserData();
    }
  }

  /**
   * Verifica si el usuario tiene al menos uno de los roles solicitados
   */
  function hasAnyRole(requiredRoles: string[]): boolean {
    return requiredRoles.some((role) => authStore.hasRole(role));
  }

  /**
   * Verifica si el usuario tiene todos los permisos solicitados
   */
  function hasAllPermissions(requiredPermissions: string[]): boolean {
    return requiredPermissions.every((perm) => authStore.hasPermission(perm));
  }

  /**
   * Método opcional para forzar el logout
   */
  async function doLogout() {
    await authStore.logout();
  }

  return {
    // Estado reactivo
    isAuthenticated,
    accessToken,
    refreshToken,
    roles,
    permissions,

    // Métodos
    checkAuth,
    fetchUserDataIfNeeded,
    hasAnyRole,
    hasAllPermissions,
    doLogout,
  };
}
