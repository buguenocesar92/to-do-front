import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean;
    requiresGuest?: boolean;
    roles?: string[]; // roles será un array de strings
    permissions?: string[]; // permissions será un array de strings
  }
}
