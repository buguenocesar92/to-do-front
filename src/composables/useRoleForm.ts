// src/composables/useRoleForm.ts
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from '@/axiosConfig';
import { useNotification } from '@/composables/useNotification';

export function useRoleForm() {
  const router = useRouter();
  const role = ref<{ id?: number; name: string }>({ name: '' });
  const isEditing = ref(false);
  const isLoading = ref(false);
  const errors = ref<Record<string, string[]>>({});
  const { showSuccessNotification, showErrorNotification } = useNotification();

  async function handleSubmit() {
    isLoading.value = true;
    errors.value = {};

    try {
      if (isEditing.value && role.value.id) {
        // Actualizar rol
        await axios.put(`/roles/${role.value.id}`, role.value);
        showSuccessNotification('Éxito', 'Rol actualizado correctamente');
      } else {
        // Crear nuevo rol
        await axios.post('/roles', role.value);
        showSuccessNotification('Éxito', 'Rol creado correctamente');
      }
      // Redirigir a la vista anterior
      router.back();
    } catch {
      showErrorNotification('Error', 'Error al guardar el rol');
    } finally {
      isLoading.value = false;
    }
  }

  async function loadRole(roleId: number) {
    isLoading.value = true;
    try {
      const { data } = await axios.get(`/roles/${roleId}`);
      role.value = data;
    } catch {
      showErrorNotification('Error', 'Error al cargar el rol');
    } finally {
      isLoading.value = false;
    }
  }

  return {
    role,
    isEditing,
    isLoading,
    errors,
    handleSubmit,
    loadRole,
  };
}
