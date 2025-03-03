<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import AdminWrapper from '@/components/AdminWrapper.vue';
import { useTaskForm } from '@/composables/useTaskForm';

const { task, isEditing, isLoading, errors, handleSubmit, loadTask } = useTaskForm();
const route = useRoute();

onMounted(() => {
  const taskId = Number(route.params.id);
  if (taskId) {
    isEditing.value = true;
    loadTask(taskId);
  }
});
</script>

<template>
  <AdminWrapper>
    <div class="container mx-auto p-6 max-w-md">
      <h2 class="text-2xl font-bold mb-6">
        {{ isEditing ? 'Editar Tarea' : 'Nueva Tarea' }}
      </h2>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Título</label>
          <input
            v-model="task.title"
            type="text"
            class="w-full px-3 py-2 border rounded"
            :class="{ 'border-red-500': errors.title }"
          />
          <p v-if="errors.title" class="text-red-500 text-sm mt-1">{{ errors.title[0] }}</p>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Descripción</label>
          <textarea
            v-model="task.description"
            class="w-full px-3 py-2 border rounded"
            :class="{ 'border-red-500': errors.description }"
          ></textarea>
          <p v-if="errors.description" class="text-red-500 text-sm mt-1">{{ errors.description[0] }}</p>
        </div>
        <div class="mb-4 flex items-center">
          <input
            v-model="task.completed"
            type="checkbox"
            class="w-6 h-6 mr-2"
          />
          <label class="text-gray-700">Completado</label>
        </div>
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
