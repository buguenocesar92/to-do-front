<script setup lang="ts">
import { useTaskManager } from '@/composables/useTaskManager';
import AdminWrapper from '@/components/AdminWrapper.vue';

// Extraemos la lógica del composable
const { tasks, isLoading, headers, handleDelete, goToCreate, goToEdit } = useTaskManager();
</script>

<template>
  <AdminWrapper>
    <div class="container mx-auto p-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Gestión de Tareas</h1>
        <v-btn color="primary" @click="goToCreate">
          <i class="fas fa-plus mr-2"></i>
          Nueva Tarea
        </v-btn>
      </div>

      <v-data-table
        :headers="headers"
        :items="tasks"
        :loading="isLoading"
        class="elevation-1"
      >
        <template #item.actions="{ item }">
          <div class="flex gap-2">
            <v-btn color="primary" @click="goToEdit(item.id)" class="ma-2 mr-2">
              <v-icon start>mdi-pencil</v-icon>
              Editar
            </v-btn>
            <v-btn color="error" @click="handleDelete(item.id)">
              <v-icon start>mdi-delete</v-icon>
              Eliminar
            </v-btn>
          </div>
        </template>

        <template #no-data>
          <div class="text-center py-4 text-gray-500">
            No se encontraron tareas
          </div>
        </template>
      </v-data-table>
    </div>
  </AdminWrapper>
</template>
