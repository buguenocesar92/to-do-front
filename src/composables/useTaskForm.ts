import { ref } from 'vue';
import { fetchTask, createTask, updateTask } from '@/services/TaskService';
import type { TaskPayload } from '@/types/TaskTypes';

/**
 * useTaskForm: Maneja el estado del formulario de tarea, incluyendo carga, envío y errores.
 */
export function useTaskForm() {
  const task = ref<TaskPayload>({ id: 0, title: '', description: '', completed: false });
  const isEditing = ref(false);
  const isLoading = ref(false);
  const errors = ref<{ [key: string]: string[] }>({});

  async function loadTask(id: number) {
    isLoading.value = true;
    try {
      const fetchedTask = await fetchTask(id);
      task.value = fetchedTask;
    } catch (err) {
      console.error('Error al cargar la tarea:', err);
    } finally {
      isLoading.value = false;
    }
  }

  async function handleSubmit() {
    isLoading.value = true;
    errors.value = {};
    try {
      if (isEditing.value) {
        const updated = await updateTask(task.value.id, task.value);
        task.value = updated;
      } else {
        const created = await createTask(task.value);
        task.value = created;
      }
    } catch (err: any) {
      console.error('Error al guardar la tarea:', err);
      if (err.response && err.response.data && err.response.data.errors) {
        errors.value = err.response.data.errors;
      }
    } finally {
      isLoading.value = false;
    }
  }

  return { task, isEditing, isLoading, errors, handleSubmit, loadTask };
}
