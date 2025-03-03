import Login from '@/views/Auth/Login.vue';
import Register from '@/views/Auth/Register.vue';
import Dashboard from '@/views/Dashboard.vue';
import NotFound from '@/views/NotFound.vue';
import AccessDenied from '@/views/AccessDenied.vue';
import TaskManager from '@/views/Task/TaskManager.vue';
import TaskForm from '@/views/Task/TaskForm.vue';
import Landing from '@/views/Landing.vue';
import RolePermissionManager from '@/views/RolesPermissions/RolePermissionManager.vue';
import RolePermissionEdit from '@/views/RolesPermissions/RolePermissionEdit.vue';

export const routes = [
  {
    path: '/',
    component: Landing,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresGuest: true, sidebar: false, label: 'Iniciar Sesión', icon: 'mdi-login' },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresGuest: true, sidebar: false, label: 'Registrarse', icon: 'mdi-account-plus' },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true, sidebar: true, label: 'Inicio', icon: 'mdi-view-dashboard' },
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: TaskManager,
    meta: { requiresAuth: false, sidebar: true, label: 'Tareas', icon: 'mdi-format-list-checkbox' },
  },
  {
    path: '/tasks/create',
    name: 'TaskCreate',
    component: TaskForm,
    meta: { requiresAuth: false, sidebar: false },
  },
  {
    path: '/tasks/:id/edit',
    name: 'TaskEdit',
    component: TaskForm,
    meta: { requiresAuth: false, sidebar: false },
    props: true,
  },
  {
    path: '/403',
    name: 'AccessDenied',
    component: AccessDenied,
    meta: { sidebar: false, label: 'Acceso Denegado', icon: 'mdi-shield-alert' },
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound,
    meta: { sidebar: false, label: 'Página No Encontrada', icon: 'mdi-alert-circle' },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
  {
    path: '/roles-permissions',
    name: 'RolePermissionManager',
    component: RolePermissionManager,
    meta: { requiresAuth: true, sidebar: true, label: 'Roles y Permisos', icon: 'mdi-shield-account' },
  },
  {
    path: '/role-permission-edit/:roleId',
    name: 'RolePermissionEdit',
    component: RolePermissionEdit,
    meta: { requiresAuth: true, sidebar: false },
    props: true,
  },
];
