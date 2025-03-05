<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import AdminWrapper from '@/components/AdminWrapper.vue';
import { useRoleForm } from '@/composables/useRoleForm';

const { role, isEditing, isLoading, errors, handleSubmit, loadRole } = useRoleForm();
const route = useRoute();
// Si se recibe un parámetro "id", se asume que es para editar, de lo contrario, para crear uno nuevo.
onMounted(() => {
  const roleId = Number(route.params.id);
  if (roleId) {
    isEditing.value = true;
    loadRole(roleId);
  }
});
</script>

<template>
  <AdminWrapper>
    <div class="container mx-auto p-6 max-w-md">
      <h2 class="text-2xl font-bold mb-6">
        {{ isEditing ? 'Editar Rol' : 'Nuevo Rol' }}
      </h2>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Nombre del Rol</label>
          <input
            v-model="role.name"
            type="text"
            class="w-full px-3 py-2 border rounded"
            :class="{ 'border-red-500': errors.name }"
          />
          <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name[0] }}</p>
        </div>
        <!-- Puedes agregar más campos según tus necesidades -->
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {{ isLoading ? 'Guardando...' : 'Guardar' }}
        </button>
      </form>
    </div>
  </AdminWrapper>
</template>
