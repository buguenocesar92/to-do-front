<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { fetchRolesWithPermissions, syncRoutePermissions } from '@/services/RolePermissionService';
import { useNotification } from '@/composables/useNotification';
import { useFormValidation } from '@/composables/useFormValidation';
import type { Role, Permission } from '@/types/RoleTypes';
import AdminWrapper from '@/components/AdminWrapper.vue';

// Estado local
const roles = ref<Role[]>([]);
const allPermissions = ref<Permission[]>([]); // Podrías usarlo más adelante

const headers = [
  { title: 'Nombre del Rol', value: 'name' },
  { title: 'Permisos Asociados', value: 'permissions' },
  { title: 'Usuarios Asociados', value: 'users' },
  { title: 'Acciones', value: 'actions', sortable: false },
];

const router = useRouter();
const { showErrorNotification, showSuccessNotification } = useNotification();
const { errorMessage, handleValidationError } = useFormValidation();

/**
 * Carga roles y permisos
 */
async function fetchRoles() {
  try {
    // Desestructuramos el objeto que retorna el servicio: { roles, permissions }
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

/**
 * Navega a la pantalla de edición de un rol
 */
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

/**
 * Navega a la pantalla para crear un rol.
 */
function goToCreateRole() {
  try {
    router.push({ name: 'RoleCreate' }); // Asegúrate de tener definido esta ruta
  } catch (error) {
    handleValidationError(error);
    if (errorMessage.value) {
      showErrorNotification('Navigation Error', errorMessage.value);
    }
  }
}

/**
 * Llama al endpoint para sincronizar rutas y permisos.
 */
async function syncRoutes() {
  try {
    const response = await syncRoutePermissions();
    showSuccessNotification(
      'Cambios Guardados',
       response.output + ' - ' + response.message
    );
    // Opcional: volver a cargar los roles para ver cambios
    await fetchRoles();
  } catch (error) {
    handleValidationError(error);
    if (errorMessage.value) {
      showErrorNotification('Sync Error', errorMessage.value);
    }
  }
}

// Cargar roles al montar el componente
onMounted(fetchRoles);
</script>

<template>
  <AdminWrapper>
    <div class="container mx-auto p-6">
      <!-- Encabezado con botones -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Gestión de Roles y Permisos</h1>
        <div class="flex gap-4">
          <!-- Botón para crear un rol -->
          <v-btn color="success" @click="goToCreateRole">
            <v-icon left>mdi-plus</v-icon>
            Crear Rol
          </v-btn>
          <!-- Botón para sincronizar rutas y permisos -->
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
            <!-- Botón Editar -->
            <v-btn color="primary" @click="goToRoleEdit(item.id)" class="ma-2 mr-2">
              <v-icon start>mdi-pencil</v-icon>
              Editar
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
