import { computed } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import router from '@/router';
import type { Router, RouteRecordRaw } from 'vue-router';
import type { SidebarItem } from '@/types/SidebarItemTypes';

export function useSidebarItems() {
  const authStore = useAuthStore();

  const isAuthenticated = computed(() => authStore.isAuthenticated);

  const hasAnyRole = (roles: string[]): boolean => {
    return roles.some((role) => authStore.roles.includes(role));
  };

  const hasAllPermissions = (permissions: string[]): boolean => {
    return permissions.every((permission) =>
      authStore.permissions.includes(permission)
    );
  };

  const displayedSidebarItems = computed<SidebarItem[]>(() => {
    const typedRouter = router as Router;

    return typedRouter
      .getRoutes()
      .filter((route: RouteRecordRaw) => {
        if (!route.meta?.sidebar) return false;

        if (route.meta.requiresAuth && !isAuthenticated.value) return false;

        if (route.meta.roles && !hasAnyRole(route.meta.roles)) return false;

        if (route.meta.permissions && !hasAllPermissions(route.meta.permissions))
          return false;

        return true;
      })
      .map((route: RouteRecordRaw) => ({
        label: route.meta?.label as string || '', // Ensure label is a string
        route: route.path, // Route is always a string
        icon: route.meta?.icon as string || '', // Ensure icon is a string
      }));
  });

  return {
    isAuthenticated,
    displayedSidebarItems,
  };
}
