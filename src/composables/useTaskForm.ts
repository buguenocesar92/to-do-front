import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchTask, createTask, updateTask } from '@/services/TaskService';
import { useNotification } from '@/composables/useNotification';
import { useFormValidation } from '@/composables/useFormValidation';
import type { TaskPayload } from '@/types/TaskTypes';

/**
 * useTaskForm: Encapsula toda la lógica para el formulario de tareas.
 * - Carga la tarea en modo edición.
 * - Gestiona la creación/actualización.
 * - Maneja estados de carga y errores.
 */
export function useTaskForm() {
  // Accedemos a la ruta y el router para navegación y parámetros.
  const route = useRoute();
  const router = useRouter();

  // Extraemos funciones de notificación y validación.
  const { showSuccessNotification, showErrorNotification } = useNotification();
  const { errors, errorMessage, handleValidationError } = useFormValidation();

  // Estados reactivos para el formulario.
  const isEditing = ref(false);
  const isLoading = ref(false);
  const task = ref<TaskPayload>({ id: 0, title: '', description: '', completed: false });

  // Función para enviar el formulario: crea o actualiza la tarea.
  async function handleSubmit() {
    try {
      isLoading.value = true;
      if (isEditing.value) {
        await updateTask(Number(route.params.id), task.value);
        showSuccessNotification('Éxito', 'Tarea actualizada correctamente');
      } else {
        await createTask(task.value);
        showSuccessNotification('Éxito', 'Tarea creada correctamente');
      }
      router.push({ name: 'Tasks' });
    } catch (error) {
      handleValidationError(error);
      if (errorMessage.value) {
        showErrorNotification('Error', errorMessage.value);
      }
    } finally {
      isLoading.value = false;
    }
  }

  // Función para cargar la tarea en modo edición.
  async function loadTask() {
    if (route.name === 'TaskEdit') {
      isEditing.value = true;
      try {
        const fetchedTask = await fetchTask(Number(route.params.id));
        if (fetchedTask) {
          task.value = fetchedTask;
        }
      } catch (error) {
        handleValidationError(error);
        if (errorMessage.value) {
          showErrorNotification('Error', errorMessage.value);
        }
      }
    }
  }

  // Cargar la tarea cuando se monta el componente.
  onMounted(() => {
    loadTask();
  });

  return { task, isEditing, isLoading, errors, handleSubmit };
}
