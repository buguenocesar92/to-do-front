<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {
  fetchRolesWithPermissions,
  syncRoutePermissions,
  deleteRole
} from '@/services/RolePermissionService';
import { useNotification } from '@/composables/useNotification';
import { useFormValidation } from '@/composables/useFormValidation';
import type { Role, Permission } from '@/types/RoleTypes';
import AdminWrapper from '@/components/AdminWrapper.vue';

const roles = ref<Role[]>([]);
const allPermissions = ref<Permission[]>([]);

const headers = [
  { title: 'Nombre del Rol', value: 'name' },
  { title: 'Permisos Asociados', value: 'permissions' },
  { title: 'Usuarios Asociados', value: 'users' },
  { title: 'Acciones', value: 'actions', sortable: false },
];

const router = useRouter();
const { showErrorNotification, showSuccessNotification } = useNotification();
const { errorMessage, handleValidationError } = useFormValidation();

async function fetchRoles() {
  try {
    const { roles: fetchedRoles, permissions: fetchedPermissions } = await fetchRolesWithPermissions();
    roles.value = fetchedRoles;
    allPermissions.value = fetchedPermissions;
  } catch (error) {
    handleValidationError(error);
    if (errorMessage.value) {
      showErrorNotification('Error!', errorMessage.value);
    }
  }
}

function goToRoleEdit(roleId: number) {
  try {
    router.push({ name: 'RolePermissionEdit', params: { roleId: roleId.toString() } });
  } catch (error) {
    handleValidationError(error);
    if (errorMessage.value) {
      showErrorNotification('Navigation Error', errorMessage.value);
    }
  }
}

function goToCreateRole() {
  try {
    router.push({ name: 'RoleCreate' });
  } catch (error) {
    handleValidationError(error);
    if (errorMessage.value) {
      showErrorNotification('Navigation Error', errorMessage.value);
    }
  }
}

async function syncRoutes() {
  try {
    const response = await syncRoutePermissions();
    showSuccessNotification('Cambios Guardados', response.output + ' - ' + response.message);
    await fetchRoles();
  } catch (error) {
    handleValidationError(error);
    if (errorMessage.value) {
      showErrorNotification('Sync Error', errorMessage.value);
    }
  }
}

async function deleteRoleAction(roleId: number) {
  if (!confirm('¿Estás seguro de eliminar este rol? Se removerá el rol de los usuarios, pero los usuarios no se eliminarán.')) {
    return;
  }
  try {
    await deleteRole(roleId);
    showSuccessNotification('Éxito', 'Rol eliminado correctamente');
    await fetchRoles();
  } catch (error) {
    handleValidationError(error);
    if (errorMessage.value) {
      showErrorNotification('Error', errorMessage.value);
    }
  }
}

onMounted(fetchRoles);
</script>

<template>
  <AdminWrapper>
    <div class="container mx-auto p-6">
      <!-- Encabezado con botones -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Gestión de Roles y Permisos</h1>
        <div class="flex gap-4">
          <v-btn color="success" @click="goToCreateRole">
            <v-icon left>mdi-plus</v-icon>
            Crear Rol
          </v-btn>
          <v-btn color="primary" @click="syncRoutes">
            <v-icon left>mdi-sync</v-icon>
            Sincronizar Rutas y Permisos
          </v-btn>
        </div>
      </div>

      <!-- Tabla de Roles -->
      <v-data-table
        :headers="headers"
        :items="roles"
        class="elevation-1"
        dense
      >
        <!-- Permisos -->
        <template #item.permissions="{ item }">
          <ul class="text-gray-700 text-sm">
            <li v-for="permission in item.permissions" :key="permission.id">
              <span class="font-semibold text-blue-600">{{ permission.readable_name }}</span>
              <span class="text-gray-500 text-xs"> ({{ permission.name }})</span>
            </li>
          </ul>
        </template>

        <!-- Usuarios -->
        <template #item.users="{ item }">
          <ul class="text-gray-700 text-sm">
            <li v-for="user in item.users" :key="user.id">
              {{ user.name }} ({{ user.email }})
            </li>
          </ul>
        </template>

        <!-- Acciones -->
        <template #item.actions="{ item }">
          <div class="flex gap-2">
            <v-btn color="primary" @click="goToRoleEdit(item.id)" class="ma-2 mr-2">
              <v-icon start>mdi-pencil</v-icon>
              Editar
            </v-btn>
            <v-btn color="red" @click="deleteRoleAction(item.id)" class="ma-2">
              <v-icon left>mdi-delete</v-icon>
              Eliminar
            </v-btn>
          </div>
        </template>

        <template #no-data>
          <div class="text-center py-4 text-gray-500">
            No se encontraron roles
          </div>
        </template>
      </v-data-table>
    </div>
  </AdminWrapper>
</template>
