<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  fetchRoleById,
  fetchAllPermissions,
  updateRolePermissions,
} from '@/services/RolePermissionService';
import {
  updateRoleUsers,
  fetchAllUsers,
} from '@/services/UserService';
import { useNotification } from '@/composables/useNotification';
import { useFormValidation } from '@/composables/useFormValidation';
import type { Role, Permission } from '@/types/RoleTypes';
import type { User } from '@/types/UserTypes';
import AdminWrapper from '@/components/AdminWrapper.vue';

// Estado principal
const role = ref<Role | null>(null);
const allPermissions = ref<Permission[]>([]);
const allUsers = ref<User[]>([]);
const selectedPermissions = ref<number[]>([]);
const selectedUsers = ref<number[]>([]);

// Router y composables
const route = useRoute();
const router = useRouter();
const { showSuccessNotification, showErrorNotification } = useNotification();
const { errorMessage, handleValidationError } = useFormValidation();

// Obtener el parámetro 'roleId' de la URL
const roleId = route.params.roleId as string;

/**
 * Carga todos los datos necesarios al montar el componente.
 */
async function loadRoleData() {
  try {
    // Limpiar datos anteriores
    role.value = null;
    allPermissions.value = [];
    allUsers.value = [];

    // Cargar el rol y sus permisos asociados
    const fetchedRole = await fetchRoleById(roleId);
    role.value = fetchedRole;

    // Cargar la lista de todos los permisos
    const fetchedPermissions = await fetchAllPermissions();
    allPermissions.value = fetchedPermissions;

    // Inicializar permisos seleccionados (IDs)
    selectedPermissions.value = fetchedRole.permissions.map(p => p.id);

    // Cargar todos los usuarios
    const fetchedUsers = await fetchAllUsers();
    allUsers.value = fetchedUsers;

    // Inicializar usuarios seleccionados (IDs)
    selectedUsers.value = fetchedRole.users.map(u => u.id);
  } catch (error) {
    handleValidationError(error);
    if (errorMessage.value) {
      showErrorNotification('Error al cargar datos', errorMessage.value);
    }
  }
}

/**
 * Guarda los cambios en el rol:
 * 1. Actualiza permisos
 * 2. Actualiza usuarios
 */
async function saveChanges() {
  try {
    // Actualizar los permisos del rol
    await updateRolePermissions(roleId, selectedPermissions.value);

    // Actualizar usuarios asociados al rol
    await updateRoleUsers(roleId, selectedUsers.value);

    await showSuccessNotification(
      'Cambios Guardados',
      'Los permisos y usuarios del rol se actualizaron correctamente.'
    );
  } catch (error) {
    handleValidationError(error);
    if (errorMessage.value) {
      showErrorNotification('Error al guardar cambios', errorMessage.value);
    }
  }
}

/**
 * Regresa a la página anterior
 */
function goBack() {
  router.back();
}

// Cargar datos al montar el componente
onMounted(loadRoleData);
</script>

<template>
  <AdminWrapper>
    <div>
      <h2 class="text-xl font-bold mb-4">Editar Rol: {{ role?.name }}</h2>

      <!-- Mostrar todos los permisos con checkboxes -->
      <div v-if="allPermissions.length > 0">
        <h3 class="text-lg font-semibold mb-2">Permisos:</h3>
        <ul>
          <li
            v-for="permission in allPermissions"
            :key="permission.id"
            class="mb-1 flex items-center"
          >
            <input
              type="checkbox"
              :value="permission.id"
              v-model="selectedPermissions"
              class="mr-2"
            />
            <span class="font-semibold text-blue-600">{{ permission.readable_name }}</span>
            <span class="text-gray-500 text-xs"> ({{ permission.name }})</span>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Cargando permisos...</p>
      </div>

      <!-- Mostrar todos los usuarios con checkboxes -->
      <div v-if="allUsers.length > 0" class="mt-4">
        <h3 class="text-lg font-semibold mb-2">Usuarios:</h3>
        <p>Selecciona quién tendrá este rol:</p>
        <ul>
          <li
            v-for="user in allUsers"
            :key="user.id"
            class="mb-1 flex items-center"
          >
            <input
              type="checkbox"
              :value="user.id"
              v-model="selectedUsers"
              class="mr-2"
            />
            <span><strong>{{ user.name }}</strong> ({{ user.email }})</span>
          </li>
        </ul>
      </div>
      <div v-else class="mt-4">
        <p>No hay usuarios disponibles.</p>
      </div>

      <div class="mt-4">
        <v-btn color="primary" @click="saveChanges">
          Guardar Cambios
        </v-btn>
        <v-btn color="secondary" @click="goBack">
          Volver
        </v-btn>
      </div>
    </div>
  </AdminWrapper>
</template>
