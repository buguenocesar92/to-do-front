import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { fetchTask, createTask, updateTask } from '@/services/TaskService';
import { useNotification } from '@/composables/useNotification';
import { useFormValidation } from '@/composables/useFormValidation';
import type { TaskPayload } from '@/types/TaskTypes';

export function useTaskForm() {
  const task = ref<TaskPayload>({ id: 0, title: '', description: '', completed: false });
  const isEditing = ref(false);
  const isLoading = ref(false);
  const errors = ref<{ [key: string]: string[] }>({});
  const router = useRouter();

  const { showSuccessNotification, showErrorNotification } = useNotification();
  const { errorMessage, handleValidationError } = useFormValidation();

  async function loadTask(id: number) {
    isLoading.value = true;
    try {
      const fetchedTask = await fetchTask(id);
      task.value = fetchedTask;
    } catch (error) {
      handleValidationError(error);
      if (errorMessage.value) {
        showErrorNotification('Error al cargar la tarea', errorMessage.value);
      }
    } finally {
      isLoading.value = false;
    }
  }

  async function handleSubmit() {
    isLoading.value = true;
    errors.value = {};
    try {
      if (isEditing.value) {
        await updateTask(task.value.id, task.value);
        showSuccessNotification('Éxito', 'Tarea actualizada correctamente');
      } else {
        await createTask(task.value);
        showSuccessNotification('Éxito', 'Tarea creada correctamente');
      }
      router.push('/tasks');
    } catch (error) {
      handleValidationError(error);
      if (errorMessage.value) {
        showErrorNotification('Error al guardar la tarea', errorMessage.value);
      }
    } finally {
      isLoading.value = false;
    }
  }

  return { task, isEditing, isLoading, errors, handleSubmit, loadTask };
}
