import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { useFormValidation } from '@/composables/useFormValidation';
import { useNotification } from '@/composables/useNotification';

export function useLoginForm() {
  const router = useRouter();
  const authStore = useAuthStore();

  // Estado del formulario
  const form = ref({ email: '', password: '' });
  const isLoading = ref(false);

  // Composables de validación y notificaciones
  const { errors, errorMessage, handleValidationError } = useFormValidation();
  const { showErrorNotification } = useNotification();

  /**
   * Maneja el envío del formulario de login
   */
  async function handleLogin() {
    isLoading.value = true;
    errors.value = {};
    errorMessage.value = null;

    try {
      await authStore.login(form.value);

      // Restablecer formulario después del login exitoso
      form.value = { email: '', password: '' };

      // Redirige a dashboard si el login fue exitoso
      router.push('/dashboard');
    } catch (error) {
      // Manejo de errores y notificación
      handleValidationError(error);
      if (errorMessage.value) {
        await showErrorNotification('Error de inicio de sesión', errorMessage.value);
      }
    } finally {
      isLoading.value = false;
    }
  }

  return { form, isLoading, errors, errorMessage, handleLogin };
}
