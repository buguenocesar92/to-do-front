import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { fetchTasks, deleteTask } from '@/services/TaskService';
import { useNotification } from '@/composables/useNotification';
import { useFormValidation } from '@/composables/useFormValidation';
import type { TaskPayload } from '@/types/TaskTypes';

/**
 * useTaskManager: Encapsula la lógica de la gestión de tareas.
 * Incluye el estado, la carga de datos, manejo de errores y navegación.
 */
export function useTaskManager() {
  const router = useRouter();
  const { showSuccessNotification, showErrorNotification } = useNotification();
  const { errorMessage, handleValidationError } = useFormValidation();

  // Estado reactivo para las tareas y la carga.
  const tasks = ref<TaskPayload[]>([]);
  const isLoading = ref(false);

  // Encabezados para la tabla de tareas.
  const headers = [
    { title: 'ID', value: 'id' },
    { title: 'Título', value: 'title' },
    { title: 'Descripción', value: 'description' },
    { title: 'Completado', value: 'completed' },
    { title: 'Acciones', value: 'actions', sortable: false },
  ];

  // Función para cargar las tareas.
  async function loadTasks() {
    try {
      isLoading.value = true;
      tasks.value = await fetchTasks();
    } catch (error) {
      handleValidationError(error);
      if (errorMessage.value) {
        showErrorNotification('Error', errorMessage.value);
      }
    } finally {
      isLoading.value = false;
    }
  }

  // Función para eliminar una tarea y recargar la lista.
  async function handleDelete(id: number) {
    try {
      await deleteTask(id);
      showSuccessNotification('Éxito', 'Tarea eliminada correctamente');
      await loadTasks();
    } catch (error) {
      handleValidationError(error);
      if (errorMessage.value) {
        showErrorNotification('Error', errorMessage.value);
      }
    }
  }

  // Navegación a la vista de creación.
  function goToCreate() {
    router.push({ name: 'TaskCreate' });
  }

  // Navegación a la vista de edición.
  function goToEdit(id: number) {
    router.push({ name: 'TaskEdit', params: { id: id.toString() } });
  }

  onMounted(() => {
    loadTasks();
  });

  return { tasks, isLoading, headers, loadTasks, handleDelete, goToCreate, goToEdit };
}
