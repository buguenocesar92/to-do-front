// src/stores/authStore.ts
import { defineStore } from 'pinia';
import { loginUser, logoutUser, fetchUserData, registerUser } from '@/services/AuthService';
import type { AuthPayload, RegisterUser } from '@/types/AuthTypes';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    accessToken: '',
    refreshToken: '',
    roles: [] as string[],
    permissions: [] as string[],
    name: '', // Nuevo campo
    email: '', // Nuevo campo
  }),

  getters: {
    hasPermission: (state) => (permission: string) => state.permissions.includes(permission),
    hasRole: (state) => (role: string) => state.roles.includes(role),
  },

  actions: {
    checkAuth() {
      const token = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');

      this.isAuthenticated = !!token && !!refreshToken;
      this.accessToken = token || '';
      this.refreshToken = refreshToken || '';
    },

    async login(payload: AuthPayload) {
      try {
        const { access_token, refresh_token } = await loginUser(payload);
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);

        this.accessToken = access_token;
        this.refreshToken = refresh_token;
        this.isAuthenticated = true;

        // Obtener datos del usuario
        await this.fetchUserData();
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },

    async logout() {
      try {
        await logoutUser();
      } catch (error) {
        console.error('Logout failed:', error);
      } finally {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        this.accessToken = '';
        this.refreshToken = '';
        this.roles = [];
        this.permissions = [];
        this.name = '';
        this.email = '';
        this.isAuthenticated = false;
      }
    },

    async fetchUserData() {
      try {
        const { name, email, roles, permissions } = await fetchUserData();
        this.name = name;
        this.email = email;
        this.roles = roles;
        this.permissions = permissions;
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },
    async register(payload: RegisterUser) {
      try {
        const { access_token, refresh_token } = await registerUser(payload);

        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);

        this.accessToken = access_token;
        this.refreshToken = refresh_token;
        this.isAuthenticated = true;

        await this.fetchUserData();
      } catch (error) {
        console.error('Registration failed:', error);
        throw error;
      }
    },
  },
});
